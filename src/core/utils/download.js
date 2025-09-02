import { safeLoad } from './yaml.js';
/**
 * 获取远程响应（带重试机制）
 * @param {string} url - 要获取的URL
 * @param {string} userAgent - 自定义User-Agent
 * @returns {Promise<{status: number, headers: Object, data: any}>} 包含状态码、响应头和数据的对象
 */
async function fetchResponse(url, userAgent) {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'User-Agent': userAgent,
            'Accept': 'text/plain,application/yaml,application/json,*/*'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const headersObj = Object.fromEntries(response.headers.entries());
    const sanitizedCD = sanitizeContentDisposition(response.headers);

    if (sanitizedCD) {
        headersObj['content-disposition'] = sanitizedCD;
    }

    let req = await response.text();
    const data = safeLoad(req).proxies;
    if (data) {
        req = { proxies: data };
    }
    return {
        status: response.status,
        headers: headersObj,
        data: req,
    };
}

/**
 * 清理Content-Disposition头
 * @param {Headers} headers - 响应头对象
 * @returns {string|null} 清理后的Content-Disposition头值
 */
function sanitizeContentDisposition(headers) {
    const contentDisposition = headers.get('content-disposition');
    if (!contentDisposition) return null;

    const filenameMatch =
        contentDisposition.match(/filename\*?=["']?(?:UTF-8'')?([^;"']+)["']?/i) ||
        contentDisposition.match(/filename=["']?([^;"']+)["']?/i);

    if (!filenameMatch) return null;

    const originalFilename = filenameMatch[1].trim();
    const isNonAscii = /[^\x00-\x7F]/.test(originalFilename);

    if (!isNonAscii) return contentDisposition;

    const fallback = 'download.yaml';
    const encoded = encodeURIComponent(originalFilename);

    return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

export { fetchResponse };