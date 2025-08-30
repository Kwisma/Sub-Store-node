import { base64EncodeUtf8 } from './core/utils/base64.js';
import { ProxyUtils } from './core/index.js';
import { safeLoad } from './core/utils/yaml.js';

/**
 * 处理节点转换流程
 */
export default async function processNodeConversion(nodeArray, target) {
    const results = {
        data: {},
        headers: [],
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
 * 合并所有处理结果
 */
function mergeResults(results, processedResults) {
    processedResults.forEach(result => {
        if (!result) return;
        if (result.result.proxies) {
            results.data.proxies = results.data.proxies || [];
            results.data.proxies.push(...result.result.proxies);
        } else if (result.result.outbounds) {
            results.data.outbounds = results.data.outbounds || [];
            results.data.outbounds.push(...result.result.outbounds);
        } else {
            results.data = result.result;
        }
        if (result.headers) results.headers.push(result.headers);
    });
}

/**
 * 处理特定目标的结果
 */
function processTargetSpecificResults(results, target) {
    if (target === 'mihomo' && results.data.proxies) {
        results.data.proxies = deduplicateProxyItems(results.data.proxies, 'name');
    } else if (target === 'singbox' && results.data.outbounds) {
        results.data.outbounds = deduplicateProxyItems(results.data.outbounds, 'tag');
    }

    if (results.data.base64) {
        results.data.base64 = base64EncodeUtf8(results.data.base64);
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
        if (Array.isArray(results.data[key]) && results.data[key].length === 0) {
            delete results.data[key];
        } else if (typeof results.data[key] === 'string' && !results.data[key]) {
            delete results.data[key];
        }
    });

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
        let result = {};
        let headers = {};

        if (isHttpInput) {
            const response = await fetchWithRetry(input, 'clash.mate');
            data = response?.data ?? response;
            headers = response?.headers;
        } else {
            // 如果不是HTTP输入，直接使用输入内容
            data = input;
        }

        if (!data) return { headers };

        // 根据数据类型处理
        const proxiesData = isProxiesData(data);
        if (proxiesData?.proxies) {
            result = await convertProxies(proxiesData, platform);
        } else if (isBase64(data)) {
            result = await convertProxies(data, platform);
        } else if (isValidURL(data)) {
            result = await processUrlData(data, platform);
        } else {
            result = await convertProxies(data, platform);
        }
        return { result, headers };
    } catch (error) {
        console.error(`Error processing input: ${input}`, error);
        // 出错时尝试直接转换
        return await convertProxies(input, platform);
    }
}

/**
 * 处理URL数据
 */
async function processUrlData(data, platform) {
    const splitData = data.split(/[\n\s]/);
    const resultsArray = await Promise.all(
        splitData.map(item => convertProxies(item, platform))
    );

    return resultsArray.reduce((acc, res) => {
        Object.entries(res).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    acc[key] = (acc[key] || []).concat(value);
                } else {
                    acc[key] = (acc[key] || '') + value;
                }
            }
        });
        return acc;
    }, {});
}

/**
 * 转换代理数据到目标格式
 */
async function convertProxies(input, platform) {
    try {
        // 如果输入是字符串，尝试解析
        if (typeof input === 'string') {
            // 尝试解析为YAML/JSON
            try {
                const parsed = safeLoad(input, { maxAliasCount: -1, merge: true });
                if (parsed && parsed.proxies) {
                    input = parsed;
                } else {
                    // 如果不是结构化数据，尝试直接解析为代理列表
                    input = { proxies: ProxyUtils.parse(input) };
                }
            } catch (e) {
                // 解析失败，尝试直接解析为代理列表
                input = { proxies: ProxyUtils.parse(input) };
            }
        }

        // 如果没有 proxies，则尝试解析并重新赋值
        if (!input?.proxies) {
            input = { proxies: ProxyUtils.parse(input) };
        }

        if (!input.proxies || input.proxies.length === 0) return {};
        if (!platform) platform = 'V2Ray';

        return ProxyUtils.produce(input.proxies, platform, 'internal');
    } catch (error) {
        console.error('Error converting proxies:', error);
        return {};
    }
}

/**
 * 生成唯一名称（去重代理项）
 */
function deduplicateProxyItems(items, nameField) {
    const nameCount = new Map();
    const result = [];

    // 统计名称出现次数
    items.forEach(item => {
        const name = item[nameField];
        nameCount.set(name, (nameCount.get(name) || 0) + 1);
    });

    // 处理重复名称
    items.forEach(item => {
        const originalName = item[nameField];

        if (nameCount.get(originalName) === 1) {
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
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'User-Agent': userAgent },
                signal: AbortSignal.timeout(10000) // 10秒超时
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const headersObj = Object.fromEntries(response.headers.entries());
            const sanitizedCD = sanitizeContentDisposition(response.headers);

            if (sanitizedCD) {
                headersObj['content-disposition'] = sanitizedCD;
            }

            return {
                status: response.status,
                headers: headersObj,
                data: await response.text(),
            };
        } catch (error) {
            if (i === retries) throw error;
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

    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (!filenameMatch) return null;

    const originalFilename = filenameMatch[1];
    const isNonAscii = /[^\x00-\x7F]/.test(originalFilename);

    if (!isNonAscii) return contentDisposition;

    const fallback = 'download.json';
    const encoded = encodeURIComponent(originalFilename);

    return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

/**
 * 工具函数：检查是否是Base64字符串
 */
function isBase64(str) {
    if (typeof str !== 'string') return false;

    // 移除可能的URL前缀
    const cleanStr = str.replace(/^data:[^;]+;base64,/, '');

    return /^[A-Za-z0-9+/=]+$/.test(cleanStr) && cleanStr.length % 4 === 0;
}

/**
 * 工具函数：检查是否是有效URL
 */
function isValidURL(str) {
    try {
        const url = new URL(str);
        return /^[a-zA-Z][a-zA-Z0-9+.-]*:$/.test(url.protocol);
    } catch {
        return false;
    }
}

/**
 * 工具函数：检查并提取代理数据
 */
function isProxiesData(textData) {
    if (typeof textData !== 'string') return false;

    try {
        const data = safeLoad(textData, { maxAliasCount: -1, merge: true });
        return data?.proxies ? { proxies: data.proxies } : false;
    } catch {
        return false;
    }
}

// 示例用法（取消注释以运行）
// const results = await processNodeConversion(
//     [
//         'https://cdn.jsdmirror.com/gh/Kwisma/MarketNest@main/config.yaml',
//     ], 'singbox');
// console.log(results);