export function base64EncodeUtf8(str) {
    const bytes = new TextEncoder('utf-8').encode(str);
    const binary = String.fromCharCode.apply(null, bytes);
    return btoa(binary);
}