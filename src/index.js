import { base64EncodeUtf8, base64DecodeUtf8, isBase64 } from './core/utils/base64.js';
import { ProxyUtils } from './core/index.js';
import { fetchResponse, safeParse } from './core/utils/download.js';

// 同步更新到 Sub-Store  ：https://github.com/sub-store-org/Sub-Store/commit/bb443c8

/**
 * 订阅转换入口
 * @param {Array<string>} urlArray - 输入订阅URL数组
 * @param {string} platform - 目标平台
 * @returns {Promise<{data: any, headers: Object}>} 合并后的结果和响应头
 */
export default async function processNodeConversion(urlArray, platform) {
    if (!urlArray || urlArray.length === 0) {
        throw new Error('输入节点数组不能为空');
    }
    const results = {
        data: {},
        headers: []
    };
    const processedResults = await Promise.all(
        urlArray.map(input => processSingleInput(input, platform))
    );
    mergeResults(results, processedResults);
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
            proxies = data.split('\n').map(item => ProxyUtils.parse(item));
        } else {
            proxies = ProxyUtils.parse(data);
        }
        data = ProxyUtils.produce(proxies, platform);
    }
    try {
        data = safeParse(data);
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
    } catch (error) {
        data = data
    }
    return { data, headers };
}

/**
 * 合并处理结果 - 根据数据类型智能合并
 * @param {Object} results - 合并目标
 * @param {Array} processedResults - 处理结果数组
 */
function mergeResults(results, processedResults) {
    const decodedDataArray = [];
    const allHeaders = [];
    processedResults.forEach(({ data, headers }) => {
        if (isBase64(data)) {
            decodedDataArray.push(data);
        }
        for (const key of Object.keys(data)) {
            if (Array.isArray(data[key])) {
                results.data[key] = results.data[key] || [];
                // 遍历数组项
                for (const item of data[key]) {
                    if (item && typeof item === 'object' && 'name' in item) {
                        let originalName = item.name;
                        let newName = originalName;
                        let counter = 1;

                        // 检查已有数组是否存在同名
                        while (results.data[key].some(x => x.name === newName)) {
                            newName = `${originalName}_${counter++}`;
                        }

                        item.name = newName;
                    }
                    results.data[key].push(item);
                }
            } else {
                // 普通值，覆盖
                results.data[key] = data[key];
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

    if (decodedDataArray.length > 0) {
        let textdata = ''
        for (const item of decodedDataArray) {
            const decodedData = base64DecodeUtf8(item);
            textdata += decodedData + '\n';
        }
        results.data = base64EncodeUtf8(textdata);
    }
}

// 示例用法（取消注释以运行）
// (async () => {
//     const data = await processNodeConversion(
//         [
//             'https://cdn.jsdmirror.com/gh/Kwisma/MarketNest@main/config.yaml',
//             'https://cdn.jsdmirror.com/gh/Kwisma/MarketNest@main/config.yaml',
//         ], 'mihomo');

//     $.info('data:', JSON.stringify(data.data, null, 2));
// })();
