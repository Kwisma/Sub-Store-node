/**
 * 日志工具
 * @namespace $
 */
export const $ = {
    log(...msg) {
        console.log(`[LOG]: ${msg.join(' ')}`);
    },

    info(...msg) {
        console.log(`[INFO]: ${msg.join(' ')}`);
    },

    error(...msg) {
        console.log(`[ERROR]: ${msg.join(' ')}`);
    }
}
