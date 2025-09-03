
/**
 * 日志工具
 * @namespace $
 */
export const $ = {
    /**
     * 格式化时间
     * @param {Date} date - 时间对象
     * @returns {string} - 格式化后的时间字符串
     */
    formatTime(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    /**
     * 打印日志
     * @param {...*} msg - 日志内容
     */
    log(...msg) {
        console.log(`${this.formatTime()} [LOG]: ${msg.join(' ')}`);
    },

    /**
     * 打印信息日志
     * @param {...*} msg - 日志内容
     */
    info(...msg) {
        console.log(`${this.formatTime()} [INFO]: ${msg.join(' ')}`);
    },

    /**
     * 打印错误日志
     * @param {...*} msg - 日志内容
     */
    error(...msg) {
        console.log(`${this.formatTime()} [ERROR]: ${msg.join(' ')}`);
    },

    /**
     * 打印警告日志
     * @param {...*} msg - 日志内容
     */
    warn(...msg) {
        console.log(`${this.formatTime()} [WARN]: ${msg.join(' ')}`);
    }
};