/**
 * base64 校验
 * @param {string} str - 要校验的字符串
 * @returns {boolean} 是否为 base64 编码
 */
const isBase64 = (str) => {
    return str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,3}$/.test(str);
}

/**
 * base64 编码
 * @param {string} str - 要编码的 UTF-8 字符串
 * @returns {string} base64 编码字符串
 */
function base64EncodeUtf8(str) {
    const bytes = new TextEncoder('utf-8').encode(str);
    const binary = String.fromCharCode.apply(null, bytes);
    return btoa(binary);
}

/**
 * base64 解码
 * @param {string} str - base64 编码字符串
 * @returns {string} 解码后的 UTF-8 字符串
 */
function base64DecodeUtf8(str) {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
}

export { isBase64, base64EncodeUtf8, base64DecodeUtf8 };