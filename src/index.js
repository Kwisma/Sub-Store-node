import { base64EncodeUtf8 } from './core/utils/base64.js';
import { ProxyUtils } from './core/index.js';
import { safeLoad } from './core/utils/yaml.js';

/**
 * 处理节点转换流程
 */
export default async function processNodeConversion(nodeArray, target) {
    const results = {
        data: {},
        headers: []
    };

    try {
        const processedResults = await Promise.all(
            nodeArray.map(input => processSingleInput(input, target))
        );
        
        mergeResults(results, processedResults);
        processTargetSpecificResults(results, target);
        return finalizeResults(results);
    } catch (error) {
        console.error('Error in processNodeConversion:', error);
        return {
            data: {},
            headers: [],
        };
    }
}

/**
 * 合并处理结果 - 根据数据类型智能合并
 */
function mergeResults(results, processedResults) {
    processedResults.forEach(({ result, headers }) => {
        if (!result) return;
        
        Object.entries(result).forEach(([key, value]) => {
            if (!value) return;
            
            // 处理配置字符串
            if (key === 'config') {
                if (typeof value === 'string') {
                    results.data.config = (results.data.config || '') + value + '\n';
                }
                return;
            }
            
            // 处理数组（proxies、outbounds等）
            if (Array.isArray(value)) {
                results.data[key] = (results.data[key] || []).concat(value);
                return;
            }
            
            // 处理对象（配置对象）
            if (typeof value === 'object') {
                if (!results.data[key]) {
                    results.data[key] = value;
                } else if (typeof results.data[key] === 'object') {
                    // 深度合并对象
                    results.data[key] = deepMerge(results.data[key], value);
                }
                return;
            }
            
            // 处理其他类型
            results.data[key] = value;
        });
        
        // 收集headers
        if (headers && Object.keys(headers).length > 0) {
            results.headers.push(headers);
        }
    });
}

/**
 * 深度合并对象
 */
function deepMerge(target, source) {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return source;
    }
    
    const result = { ...target };
    
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (key in target && 
                typeof target[key] === 'object' && 
                typeof source[key] === 'object' &&
                !Array.isArray(target[key]) &&
                !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    
    return result;
}

/**
 * 处理特定目标的结果
 */
function processTargetSpecificResults(results, target) {
    // 根据目标平台进行特定处理
    switch (target) {
        case 'clash':
            // 处理Clash特定的数据格式
            if (results.data.proxies && Array.isArray(results.data.proxies)) {
                results.data.proxies = deduplicateProxyItems(results.data.proxies, 'name');
            }
            break;
        case 'singbox':
            // 处理SingBox特定的数据格式
            if (results.data.outbounds && Array.isArray(results.data.outbounds)) {
                results.data.outbounds = deduplicateProxyItems(results.data.outbounds, 'tag');
            }
            break;
        default:
            // 默认处理
            if (results.data) {
                results.data = deduplicateProxyItems(results.data, 'name');
            }
    }
}

/**
 * 最终处理结果
 */
function finalizeResults(results) {
    // 随机选择一个headers
    const randomHeaders = results.headers.length > 0
        ? results.headers[Math.floor(Math.random() * results.headers.length)]
        : [];

    // 清理空的 data 字段
    Object.keys(results.data).forEach(key => {
        const value = results.data[key];
        
        if (Array.isArray(value) && value.length === 0) {
            delete results.data[key];
        } else if (typeof value === 'string' && !value.trim()) {
            delete results.data[key];
        } else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
            delete results.data[key];
        }
    });

    // 如果只有 config 字段，直接返回字符串
    const keys = Object.keys(results.data);
    if (keys.length === 1 && keys[0] === 'config' && typeof results.data.config === 'string') {
        return {
            data: results.data.config,
            headers: randomHeaders,
        };
    }

    return {
        data: results.data,
        headers: randomHeaders,
    };
}

/**
 * 处理单个输入
 */
async function processSingleInput(input, platform) {
    try {
        const isHttpInput = /^https?:\/\//i.test(input);
        let data = null;
        let headers = {};

        if (isHttpInput) {
            const response = await fetchWithRetry(input, 'clash.mate');
            data = response?.data ?? response;
            headers = response?.headers ?? {};
        } else {
            data = input;
        }

        if (!data) {
            return { result: null, headers };
        }

        // 转换代理数据
        const result = await convertProxies(data, platform);
        return { result, headers };
    } catch (error) {
        console.error(`Error processing input: ${input}`, error);
        // 出错时尝试直接转换
        try {
            const result = await convertProxies(input, platform);
            return { result, headers: {} };
        } catch (fallbackError) {
            console.error(`Fallback conversion also failed for: ${input}`, fallbackError);
            return { result: null, headers: {} };
        }
    }
}

/**
 * 转换代理数据到目标格式
 */
async function convertProxies(input, platform) {
    try {
        let proxiesData = input;

        // 如果输入是字符串，尝试解析
        if (typeof input === 'string') {
            // 尝试解析为YAML/JSON
            try {
                const parsed = safeLoad(input, { maxAliasCount: -1, merge: true });
                if (parsed && (parsed.proxies || parsed.outbounds)) {
                    proxiesData = parsed;
                } else {
                    // 如果不是标准格式，尝试直接解析为代理列表
                    proxiesData = { proxies: ProxyUtils.parse(input) };
                }
            } catch (e) {
                // 解析失败，尝试直接解析为代理列表
                proxiesData = { proxies: ProxyUtils.parse(input) };
            }
        }

        // 确保有代理数据
        if (!proxiesData.proxies && !proxiesData.outbounds) {
            proxiesData = { proxies: ProxyUtils.parse(input) };
        }

        const hasProxies = proxiesData.proxies && proxiesData.proxies.length > 0;
        const hasOutbounds = proxiesData.outbounds && proxiesData.outbounds.length > 0;
        
        if (!hasProxies && !hasOutbounds) {
            return {};
        }

        if (!platform) {
            platform = 'V2Ray';
        }

        const rawResult = ProxyUtils.produce(
            hasProxies ? proxiesData.proxies : proxiesData.outbounds, 
            platform, 
            'internal'
        );

        // 根据 rawResult 的实际类型决定返回格式
        return normalizeConversionResult(rawResult);
    } catch (error) {
        console.error('Error converting proxies:', error);
        throw error;
    }
}

/**
 * 标准化转换结果格式 - 根据数据类型自动判断
 */
function normalizeConversionResult(result) {
    if (!result) return {};
    
    // 1. 如果是字符串（base64、VMess链接等），直接返回字符串格式
    if (typeof result === 'string') {
        return { config: result };
    }
    
    // 2. 如果是数组，检查数组内容决定格式
    if (Array.isArray(result)) {
        // 检查数组元素是否有特定字段来判断格式
        const firstItem = result[0];
        
        if (firstItem && firstItem.tag !== undefined) {
            // 有 tag 字段，可能是 singbox outbounds
            return { outbounds: result };
        } else if (firstItem && firstItem.name !== undefined) {
            // 有 name 字段，可能是 clash proxies
            return { proxies: result };
        } else {
            // 其他类型的数组，转换为字符串
            const configString = result.map(item => {
                if (typeof item === 'string') return item;
                if (typeof item === 'object') return JSON.stringify(item);
                return String(item);
            }).join('\n');
            
            return { config: configString };
        }
    }
    
    // 3. 如果是对象，检查对象结构决定格式
    if (typeof result === 'object' && result !== null) {
        // 如果对象包含特定的配置键，直接返回
        if (result.proxies !== undefined || result.outbounds !== undefined || 
            result.rules !== undefined || result['proxy-groups'] !== undefined) {
            return result;
        }
        
        // 其他对象转换为JSON字符串
        try {
            return { config: JSON.stringify(result, null, 2) };
        } catch {
            return { config: String(result) };
        }
    }
    
    // 4. 其他类型转换为字符串
    return { config: String(result) };
}

/**
 * 判断是否为代理数据
 */
function isProxiesData(data) {
    if (typeof data !== 'string') return false;
    
    try {
        const parsed = safeLoad(data);
        return !!(parsed && (parsed.proxies || parsed.outbounds));
    } catch (e) {
        return false;
    }
}

/**
 * 生成唯一名称（去重代理项）
 */
function deduplicateProxyItems(items, nameField) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return items;
    }

    const nameCount = new Map();
    const result = [];

    // 统计名称出现次数
    items.forEach(item => {
        const name = item[nameField];
        if (name) {
            nameCount.set(name, (nameCount.get(name) || 0) + 1);
        }
    });

    // 处理重复名称
    items.forEach(item => {
        const originalName = item[nameField];
        
        if (!originalName || nameCount.get(originalName) === 1) {
            result.push(item);
            return;
        }

        let suffix = 1;
        let newName;

        do {
            newName = `${originalName}_${suffix++}`;
        } while (nameCount.has(newName));

        nameCount.set(newName, 1);
        result.push({ ...item, [nameField]: newName });
    });

    return result;
}

/**
 * 获取远程响应（带重试机制）
 */
async function fetchWithRetry(url, userAgent, retries = 2) {
    for (let i = 0; i <= retries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(url, {
                method: 'GET',
                headers: { 
                    'User-Agent': userAgent,
                    'Accept': 'text/plain,application/yaml,application/json,*/*'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const headersObj = Object.fromEntries(response.headers.entries());
            const sanitizedCD = sanitizeContentDisposition(response.headers);

            if (sanitizedCD) {
                headersObj['content-disposition'] = sanitizedCD;
            }

            const data = await response.text();

            return {
                status: response.status,
                headers: headersObj,
                data: data,
            };
        } catch (error) {
            if (i === retries) {
                throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts: ${error.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 指数退避
        }
    }
}

/**
 * 清理Content-Disposition头
 */
function sanitizeContentDisposition(headers) {
    const contentDisposition = headers.get('Content-Disposition') || headers.get('content-disposition');
    if (!contentDisposition) return null;

    const filenameMatch = contentDisposition.match(/filename\*?=["']?(?:UTF-8'')?([^;"']+)["']?/i) || 
                         contentDisposition.match(/filename=["']?([^;"']+)["']?/i);
    
    if (!filenameMatch) return null;

    const originalFilename = filenameMatch[1].trim();
    const isNonAscii = /[^\x00-\x7F]/.test(originalFilename);

    if (!isNonAscii) return contentDisposition;

    const fallback = 'download.yaml';
    const encoded = encodeURIComponent(originalFilename);

    return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

// 示例用法（取消注释以运行）
// const results = await processNodeConversion(
//     [
//         'https://cdn.jsdmirror.com/gh/Kwisma/MarketNest@main/config.yaml',
//     ], 'singbox');
// console.log(results);