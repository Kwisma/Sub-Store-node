import processNodeConversion from './src/index.js'
export default {
    async fetch(request) {
        try {
            const url = new URL(request.url);
            let target = url.searchParams.get('target');
            const inputnode = url.searchParams.get('url');
            const nodeArray = inputnode ? inputnode.split(/[,|]/) : [];

            // 标准化目标类型
            if (/meta|clash.meta|clash|clashverge|mihomo/i.test(target)) target = 'mihomo';
            if (/singbox|sing-box|sfa/i.test(target)) target = 'singbox';

            if (!target || nodeArray.length === 0) {
                return renderUsageInstructions();
            }

            const result = await processNodeConversion(nodeArray, target);
            let data = result.data
            if (typeof data == 'object') {
                data = JSON.stringify(data)
            }
            return new Response(data, {
                status: 200,
                headers: result.headers,
            });
        } catch (error) {
            return new Response(`Error: ${error.message}`, { status: 500 });
        }
    },
};

/**
 * 返回使用说明
 * @returns {Response} 包含使用说明的JSON响应
 */
function renderUsageInstructions() {
    return new Response(
        JSON.stringify(
            {
                version: 'SubStore v2.20.16',
                message: '这是一个基于 cloudflare pagers 的 sub-store 节点转换工具，仅转换节点用',
                usage: {
                    target: '输出类型：{singbox|mihomo|v2ray|base64|qx|QX|QuantumultX|surge|Surge|SurgeMac|Loon|Clash|meta|clashmeta|clash.meta|Clash.Meta|ClashMeta|Mihomo|uri|URI|json|JSON|stash|Stash|shadowrocket|Shadowrocket|ShadowRocket|surfboard|Surfboard|egern|Egern}',
                    url: '输入编码后的订阅链接，多个订阅可用英文逗号(,)分隔',
                    example: '/?target=v2ray&url=UrlEncode(编码后的订阅)',
                    examples: [
                        '/?target=v2ray&url=https%3A%2F%2Fexample.com%2Fsubscription',
                        '/?target=clash&url=https%3A%2F%2Fexample.com%2Fsub1,https%3A%2F%2Fexample.com%2Fsub1'
                    ]
                },
                notes: [
                    '所有订阅链接必须进行URL编码处理',
                    '多个订阅链接使用英文逗号分隔，不要添加空格'
                ]
            },
            null,
            4
        ),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}