import { base64EncodeUtf8, base64DecodeUtf8, isBase64 } from './core/utils/base64.js';
import { ProxyUtils } from './core/index.js';
import { fetchResponse } from './core/utils/download.js';
import { safeLoad, safeDump } from './core/utils/yaml.js';
import PROXY_PRODUCERS from './core/producers/index.js';

// 同步更新到 Sub-Store  ：https://github.com/sub-store-org/Sub-Store/commit/bb443c8

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
        const processedResults = await Promise.all(
            urlArray.map(input => processSingleInput(input, platform))
        );
        mergeResults(results, processedResults);
    } catch (error) {
        results.status = 500
        results.data = `处理节点失败：${error.message}`;
        return results;
    }
    results.status = 200
    return results;
}

/**
 * 处理单个输入节点
 * @param {string} input - 输入订阅URL
 * @param {string} platform - 目标平台
 * @returns {Promise<{data: any, headers: Object}>} 处理后的结果和响应头
 */
async function processSingleInput(input, platform) {
    let data = null;
    let proxies = [];
    let headers = {};
    const isHttpInput = /^https?:\/\//i.test(input);
    if (isHttpInput) {
        const response = await fetchResponse(input, 'clash.mate');
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
        data = ProxyUtils.produce(proxies, platform);
    }
    return { data, headers };
}

/**
 * 合并处理结果 - 根据数据类型智能合并
 * @param {Object} results - 合并目标
 * @param {Array} processedResults - 处理结果数组
 */
function mergeResults(results, processedResults) {
    const proxyDataArray = [];
    const base64DataArray = [];
    const allHeaders = [];
    processedResults.forEach(({ data, headers }) => {
        if (isBase64(data)) {
            base64DataArray.push(data);
        } else {
            const dataObj = safeLoad(data).proxies;
            if (dataObj) {
                proxyDataArray.push(dataObj);
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
    if (proxyDataArray.length > 0) {
        const proxies = proxyDataArray.flat();
        results.data = safeDump({ proxies });
    }
}
