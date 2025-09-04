
/**
 * 日志工具
 * @namespace $
 */
export const $ = {
    projectPrefix: 'Sub-Store-node',
    /**
     * 格式化时间 (Asia/Shanghai)
     * @returns {string} - 格式化后的时间字符串
     */
    formatTime() {
        return (new Date()).toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '-');
    },

    /**
     * 内部通用日志函数
     * @param {string} level - 日志级别
     * @param {...*} args - 日志内容
     */
    _log(level, ...args) {
        const time = this.formatTime();
        console.log(`[${this.projectPrefix}]`, time, `[${level}]:`, ...args);
    },

    /**
     * 打印日志
     * @param {...*} msg - 日志内容
     */
    log(...args) {
        this._log('LOG', ...args);
    },

    /**
     * 打印信息日志
     * @param {...*} msg - 日志内容
     */
    info(...args) {
        this._log('INFO', ...args);
    },

    /**
     * 打印错误日志
     * @param {...*} msg - 日志内容
     */
    error(...args) {
        this._log('ERROR', ...args);
    },

    /**
     * 打印警告日志
     * @param {...*} msg - 日志内容
     */
    warn(...args) {
        this._log('WARN', ...args);
    }
};
