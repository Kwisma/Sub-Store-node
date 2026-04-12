import { base64EncodeUtf8, base64DecodeUtf8, isBase64 } from './core/utils/base64.js';
import { fetchResponse } from './core/utils/download.js';
// 使用上游版本的工具函数
import { ProxyUtils } from './sub/backend/src/core/proxy-utils/index.js';
import { safeLoad, safeDump } from './sub/backend/src/utils/yaml.js';
import PROXY_PRODUCERS from './sub/backend/src/core/proxy-utils/producers/index.js';
// 本地版本的工具函数
// import { ProxyUtils } from './core/index.js';
// import { safeLoad, safeDump } from './core/utils/yaml.js';
// import PROXY_PRODUCERS from './core/producers/index.js';
ProxyUtils.parse('dHJvamFuOi8vMmVhZGI5MmQtMTIwYi00OTllLTg3MDctYTg4ZTZhZDA4OWE5QDAuMC4wLjA6NDQzP3NlY3VyaXR5PXRscyZzbmk9ZXhhbXBsZS5jb20mZnA9Y2hyb21lJnR5cGU9d3MmaG9zdD0mcGF0aD0lMkYlM0ZlZCUzRDIwNDgmYWxwbj1oMyMlRTYlQkYlODAlRTYlQjQlQkJwZWdneQ==')
/**
 * 订阅转换入口
 * @param {Array<string>} urlArray - 输入订阅URL数组
 * @param {string} platform - 目标平台
 * @returns {Promise<{data: any, headers: Object, status: number}>} 合并后的结果和响应头
 */
export default async function processNodeConversion(urlArray, platform) {
    const results = {
        data: {},
        headers: []
    };
    if (!urlArray || urlArray.length === 0) {
        results.status = 400
        results.data = '输入节点数组不能为空';
        return results;
    }
    if (!PROXY_PRODUCERS[platform]) {
        results.status = 400
        results.data = `目标平台：不支持 ${platform}！`;
        return results;
    }
    try {
        const globalNameCount = new Map();
        const processedResults = await Promise.all(
            urlArray.map((input, index) => processSingleInput(input, platform, index, globalNameCount))
        );
        mergeResults(results, processedResults);
    } catch (error) {
        results.status = 500
        results.data = `处理节点失败：${error.message}`;
        return results;
    }
    results.status = 200
    if(results.data && typeof results.data === 'object' && Object.keys(results.data).length === 0) {
        results.data = '处理完成，但未生成有效数据，请检查输入节点的格式和内容。';
    }
    return results;
}

/**
 * 处理单个输入节点
 * @param {string} input - 输入订阅URL
 * @param {string} platform - 目标平台
 * @param {number} index - 当前处理的输入索引
 * @param {Map} globalNameCount - 名称计数器
 * @returns {Promise<{data: any, headers: Object}>} 处理后的结果和响应头
 */
async function processSingleInput(input, platform, index, globalNameCount) {
    let data = input;
    let proxies = [];
    let headers = {};
    const isHttpInput = /^https?:\/\//i.test(input);
    if (isHttpInput) {
        const response = await fetchResponse(input, 'v2ray');
        headers = response?.headers ?? {};
        data = response?.data ?? response;
    }
    if (data.proxies) {
        data = ProxyUtils.produce(data.proxies, platform);
    } else {
        if (!isBase64(data)) {
            proxies = data.split('\n').filter(item => item.trim()).map(ProxyUtils.parse).flat(Infinity).filter(Boolean);
        } else {
            proxies = ProxyUtils.parse(data);
        }
        proxies = deduplicateWithGlobalMap(proxies, globalNameCount);
        data = ProxyUtils.produce(proxies, platform);
    }
    return { data, headers, index };
}

/**
 * 合并处理结果 - 根据数据类型智能合并
 * @param {Object} results - 合并目标
 * @param {Array} processedResults - 处理结果数组
 */
function mergeResults(results, processedResults) {
    const base64DataArray = [];
    const allHeaders = [];
    const objectDataArray = [];
    processedResults.forEach(({ data, headers }) => {
        if (isBase64(data)) {
            base64DataArray.push(data);
        } else {
            const loaded = safeLoad(data);
            if (loaded && typeof loaded === 'object') {
                for (const key of Object.keys(loaded)) {
                    const val = loaded[key];
                    if (key === '0') {
                        objectDataArray.push(val)
                        continue
                    }
                    if (Array.isArray(val)) {
                        if (!Array.isArray(results.data[key])) {
                            results.data[key] = [];
                        }
                        results.data[key].push(...val);
                    }
                }
            } else {
                results.data = data;
            }
        }
        // 合并响应头，简化判断逻辑
        if (headers && Object.keys(headers).length) {
            allHeaders.push(headers);
        }
    });

    if (allHeaders.length > 0) {
        const randomIndex = Math.floor(Math.random() * allHeaders.length);
        results.headers = allHeaders[randomIndex];
    }

    if (base64DataArray.length > 0) {
        let textdata = ''
        for (const item of base64DataArray) {
            const decodedData = base64DecodeUtf8(item);
            textdata += decodedData + '\n';
        }
        results.data = base64EncodeUtf8(textdata);
    }

    if (objectDataArray.length > 0) {
        results.data = objectDataArray
    }

    if (results.data.proxies) {
        results.data = safeDump(results.data, { lineWidth: -1 });
    }
}
function deduplicateWithGlobalMap(proxies, globalNameCount) {
    return proxies.map(proxy => {
        let baseName = proxy.name || 'node';
        if (globalNameCount.has(baseName)) {
            const count = globalNameCount.get(baseName) + 1;
            globalNameCount.set(baseName, count);
            proxy.name = `${baseName} [${count}]`;
        } else {
            globalNameCount.set(baseName, 0);
            proxy.name = baseName;
        }
        return proxy;
    });
}