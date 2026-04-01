import processNodeConversion from './src/index.js'
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const target = url.searchParams.get('target');
        const inputnode = url.searchParams.get('url');
        const nodeArray = inputnode ? inputnode.split(/[,|]/) : [];
        if (target && nodeArray) {
            try {
                const result = await processNodeConversion(nodeArray, target);
                let data = result.data
                if (typeof data == 'object') {
                    data = JSON.stringify(data)
                }
                return new Response(data, {
                    status: result.status,
                    headers: result.headers,
                });
            } catch (error) {
                return new Response(`Error: ${error.message}`, { status: 500 });
            }
        }
        return renderUsageInstructions();
    },
};

/**
 * 返回使用说明
 * 同步更新到 Sub-Store ：https://github.com/sub-store-org/Sub-Store/commit/dd2ed938e376a225e08e9d498098466b9175b045
 * @returns {Response} 包含使用说明的JSON响应
 */
function renderUsageInstructions() {
    const version = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'dev';
    const data = {
        version: `SubStore V${version}`,
        message: '这是一个基于 cloudflare workers 的 sub-store 节点转换工具，仅转换节点用',
        usage: {
            target: '输出类型：{singbox|mihomo|v2ray|base64|qx|QX|QuantumultX|surge|Surge|SurgeMac|Loon|Clash|meta|clashmeta|clash.meta|Clash.Meta|ClashMeta|Mihomo|uri|URI|json|JSON|stash|Stash|shadowrocket|Shadowrocket|ShadowRocket|surfboard|Surfboard|egern|Egern}',
            url: '输入编码后的订阅链接，多个订阅可用英文逗号(,)分隔',
            example: '/?target=v2ray&url=UrlEncode(编码后的订阅)',
            examples: [
                '/?target=v2ray&url=https%3A%2F%2Fexample.com%2Fsubscription',
                '/?target=clash&url=https%3A%2F%2Fexample.com%2Fsub1,https%3A%2F%2Fexample.com%2Fsub1'
            ]
        }
    }
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>SubStore 节点转换工具 | 使用说明</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(145deg, #f6f9fc 0%, #eef2f5 100%);
            font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            padding: 2rem 1.5rem;
            min-height: 100vh;
            color: #1a2c3e;
        }

        /* 主容器 */
        .container {
            max-width: 1300px;
            margin: 0 auto;
        }

        /* 头部卡片 */
        .hero {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(2px);
            border-radius: 2.5rem;
            padding: 2rem 2rem 1.8rem;
            margin-bottom: 2rem;
            box-shadow: 0 12px 28px -8px rgba(0, 32, 64, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .version-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #1e3a5f20;
            backdrop-filter: blur(4px);
            padding: 0.4rem 1rem;
            border-radius: 60px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #0a4b6e;
            margin-bottom: 1.2rem;
            letter-spacing: 0.3px;
            border: 0.5px solid rgba(59, 130, 246, 0.2);
        }

        .version-badge svg {
            width: 18px;
            height: 18px;
            vertical-align: middle;
        }

        h1 {
            font-size: 2.4rem;
            font-weight: 700;
            background: linear-gradient(135deg, #1f4e79, #0e2a44);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            letter-spacing: -0.02em;
            margin-bottom: 0.75rem;
        }

        .message {
            font-size: 1.1rem;
            color: #2c5a7a;
            border-left: 4px solid #3b82f6;
            padding-left: 1rem;
            margin-top: 0.5rem;
            background: #f0f7ff60;
            border-radius: 0 1rem 1rem 0;
        }

        /* 网格布局 */
        .grid-2col {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 1.8rem;
            margin-bottom: 2rem;
        }

        /* 通用卡片样式 */
        .card {
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(0px);
            border-radius: 1.8rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            overflow: hidden;
            border: 1px solid #ffffffcc;
        }

        .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 30px -12px rgba(0, 32, 64, 0.12);
            background: rgba(255, 255, 255, 0.98);
        }

        .card-header {
            padding: 1.4rem 1.8rem 0.6rem 1.8rem;
            border-bottom: 1px solid #e9edf2;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .card-header h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e3a5f;
            letter-spacing: -0.3px;
        }

        .icon-bg {
            width: 36px;
            height: 36px;
            background: #eef3fc;
            border-radius: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #2c6b9e;
        }

        .card-content {
            padding: 1.4rem 1.8rem 1.8rem 1.8rem;
        }

        .param-block {
            background: #f8fafd;
            border-radius: 1.2rem;
            padding: 0.9rem 1.2rem;
            margin-bottom: 1.2rem;
            font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
            font-size: 0.85rem;
            word-break: break-all;
            border-left: 3px solid #3b82f6;
        }

        .param-label {
            font-weight: 700;
            color: #0f3b5c;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
            display: block;
        }

        .target-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 1rem 0 0.4rem;
        }

        .tag {
            background: #eef2f9;
            padding: 0.25rem 0.9rem;
            border-radius: 30px;
            font-size: 0.75rem;
            font-weight: 500;
            color: #1f6392;
            font-family: monospace;
            transition: all 0.1s;
            border: 0.5px solid #cbdde9;
        }

        .url-example {
            background: #0f172a;
            color: #e2e8f0;
            padding: 0.9rem 1rem;
            border-radius: 1rem;
            font-family: monospace;
            font-size: 0.8rem;
            overflow-x: auto;
            white-space: pre-wrap;
            word-break: break-all;
        }

        .example-list {
            margin-top: 1rem;
        }

        .example-item {
            background: #f1f5f9;
            padding: 0.7rem 1rem;
            border-radius: 1rem;
            margin-bottom: 0.8rem;
            font-family: monospace;
            font-size: 0.8rem;
            border: 1px solid #e2e8f0;
            transition: all 0.1s;
        }

        .example-item code {
            background: #e6edf4;
            padding: 0.2rem 0.4rem;
            border-radius: 8px;
            color: #075985;
        }

        .footer-note {
            margin-top: 2rem;
            text-align: center;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 2rem;
            padding: 1rem 1.5rem;
            font-size: 0.85rem;
            color: #3f6b8c;
            backdrop-filter: blur(4px);
            border: 0.5px solid #eef3fc;
        }

        hr {
            margin: 1rem 0;
            border: none;
            border-top: 1px solid #dce5ec;
        }

        @media (max-width: 640px) {
            body {
                padding: 1.2rem;
            }

            .card-header h2 {
                font-size: 1.3rem;
            }

            .hero {
                padding: 1.5rem;
            }

            h1 {
                font-size: 1.8rem;
            }
        }

        button.copy-btn {
            background: #eef2fa;
            border: none;
            border-radius: 20px;
            padding: 0.2rem 0.8rem;
            font-size: 0.7rem;
            font-weight: 500;
            color: #1e5a88;
            cursor: pointer;
            transition: all 0.2s;
            margin-left: 8px;
            vertical-align: middle;
        }

        button.copy-btn:hover {
            background: #cbdde9;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- 头部信息区：展示版本 + 核心消息 -->
        <div class="hero">
            <div class="version-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span>SubStore</span>
            </div>
            <h1>⚡ SubStore 节点转换工具</h1>
            <div class="message">
                📡 基于 Cloudflare Workers 的轻量级订阅转换引擎 · 仅转换节点，纯净高效
            </div>
        </div>

        <div class="grid-2col">
            <!-- 左侧：核心参数 + 目标类型 -->
            <div class="card">
                <div class="card-header">
                    <div class="icon-bg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <h2>⚙️ 转换参数</h2>
                </div>
                <div class="card-content">
                    <div class="param-block">
                        <span class="param-label">🎯 target · 输出类型</span>
                        <div class="target-tags" id="targetTagsContainer">
                            <!-- 动态渲染目标类型列表，保持整洁 -->
                        </div>
                        <div style="font-size:0.75rem; color:#527c9a; margin-top: 8px;">
                            支持主流客户端: singbox, mihomo, clash, v2ray, base64, quantumultX, surge, loon, stash,
                            shadowrocket, surfboard, egern 等
                        </div>
                    </div>

                    <div class="param-block">
                        <span class="param-label">🔗 url · 订阅链接</span>
                        <div style="margin-bottom: 6px; font-size:0.85rem; color:#1f4e6e;">
                            输入编码后的订阅链接，多个订阅请用英文逗号 <code style="background:#e4eef5;">,</code> 分隔
                        </div>
                        <div
                            style="background:#eef2f7; border-radius: 14px; padding: 0.5rem 1rem; font-family: monospace; font-size:0.8rem;">
                            UrlEncode(编码后的订阅)
                        </div>
                    </div>

                    <div class="param-block">
                        <span class="param-label">📌 基础示例格式</span>
                        <code
                            style="background:#eef2f7; padding:0.2rem 0.5rem; border-radius: 12px;">/?target=v2ray&url=UrlEncode(编码后的订阅)</code>
                        <button class="copy-btn" id="copyBaseExample">复制示例</button>
                    </div>
                </div>
            </div>

            <!-- 右侧：完整使用示例 + 多订阅演示 -->
            <div class="card">
                <div class="card-header">
                    <div class="icon-bg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.6">
                            <path
                                d="M8 4v12M16 8v8M4 8h4M12 16h4M4 16h2M18 8h2M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                stroke="currentColor" stroke-linecap="round" />
                        </svg>
                    </div>
                    <h2>📋 真实调用示例</h2>
                </div>
                <div class="card-content">
                    <div style="font-weight: 500; margin-bottom: 10px;">✨ 快速上手 (已 URL 编码示范)</div>
                    <div class="example-list" id="exampleList"></div>
                    <div class="footer-note"
                        style="margin-top: 1rem; background:#f2f6fb; padding: 0.6rem; font-size:0.75rem; text-align:left;">
                        💡 提示：订阅链接需经过 <strong>encodeURIComponent</strong> 编码，多个订阅用英文逗号分隔后整体编码。<br>
                        示例中已展示单订阅与多订阅的典型用法。
                    </div>
                </div>
            </div>
        </div>

        <!-- 额外详细信息：支持的target完整列表 / 更全面的usage -->
        <div class="card" style="margin-top: 0.2rem;">
            <div class="card-header">
                <div class="icon-bg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.6">
                        <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            stroke="currentColor" stroke-linecap="round" />
                    </svg>
                </div>
                <h2>📖 全量支持的目标 (target)</h2>
            </div>
            <div class="card-content">
                <div class="target-tags" id="fullTargetList" style="margin-bottom: 1rem;"></div>
                <div style="background:#f1f6fe; border-radius: 1rem; padding: 0.8rem 1rem; font-size:0.85rem;">
                    <span style="font-weight:600;">🌐 多订阅合并规则：</span> 提供多个 url 时，使用英文逗号分隔订阅地址，工具会自动合并节点并按照所选 target
                    格式输出。
                    <hr style="margin: 10px 0;">
                    <span style="font-weight:600;">🏷️ 别名兼容：</span> clash.meta / Clash.Meta / clashmeta / mihomo 均指向
                    Meta 核心；QX / QuantumultX 等效；Surge/SurgeMac 均受支持。
                </div>
            </div>
        </div>

        <div class="footer-note">
            ⚡ SubStore Worker 版 · 仅转换节点 | 使用标准 API 风格 <code>/ ?target=&url=</code> 轻松集成至各类客户端或自用脚本
        </div>
    </div>

    <script>
        // 原始数据 (基于原有的 usage 信息)
        const usageData = ${JSON.stringify(data)};

        // 解析 target 字符串，提取所有支持的别名 (去重且保持常见)
        function extractTargetSet(targetStr) {
            // 匹配花括号内的内容
            const match = targetStr.match(/\{(.*?)\}/);
            if (!match) return [];
            let items = match[1].split('|').map(s => s.trim());
            // 不去重，直接返回所有项（保留原始顺序）
            return items;
        }

        const allTargetsRaw = usageData.usage.target;
        const targetArray = extractTargetSet(allTargetsRaw);

        // 额外补充一些展示分组
        const targetGroups = [
            "singbox", "mihomo", "clash", "meta", "clash.meta", "Mihomo",
            "v2ray", "base64", "qx", "QuantumultX", "surge", "SurgeMac",
            "Loon", "uri", "json", "stash", "shadowrocket", "surfboard", "egern"
        ];
        // 展示常用标签集合 (为了避免过多，将唯一值渲染)
        const displayTargets = [...new Set(targetArray.length ? targetArray : targetGroups)];

        // 渲染左侧的 target-tags 简约列表 (前18个)
        function renderTargetTags(containerId, limit = 0) {
            const container = document.getElementById(containerId);
            if (!container) return;
            let targetsToShow = displayTargets;
            if (limit > 0 && targetsToShow.length > limit) targetsToShow = targetsToShow.slice(0, limit);
            container.innerHTML = '';
            targetsToShow.forEach(t => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = t;
                container.appendChild(span);
            });
            if (limit > 0 && displayTargets.length > limit) {
                const moreSpan = document.createElement('span');
                moreSpan.className = 'tag';
                moreSpan.style.background = '#e2eaf1';
                moreSpan.textContent = \`+\${displayTargets.length - limit} 更多\`;
                container.appendChild(moreSpan);
            }
        }

        // 渲染完整 target 列表卡片
        function renderFullTargetList() {
            const container = document.getElementById('fullTargetList');
            if (!container) return;
            container.innerHTML = '';
            // 展示全部 target 并且带风格
            displayTargets.forEach(t => {
                const badge = document.createElement('span');
                badge.className = 'tag';
                badge.style.fontSize = '0.75rem';
                badge.style.padding = '0.25rem 1rem';
                badge.textContent = t;
                container.appendChild(badge);
            });
            // 额外加个提示说明别名丰富
        }

        // 渲染右侧示例列表 (基于 usage.examples)
        function renderExamples() {
            const container = document.getElementById('exampleList');
            if (!container) return;
            const examplesArr = usageData.usage.examples || [];
            // 额外添加一个多订阅混合示例以及更直观的展示
            const enhancedExamples = [
                ...examplesArr,
                '/?target=singbox&url=https%3A%2F%2Fmysub.com%2Flink%2Fv2ray%3Dabc123',
                '/?target=clash.meta&url=https%3A%2F%2Fnode.example%2Fsub%3Ftoken%3Dxyz%2Chttps%3A%2F%2Fbackup.link%2Fsub2'
            ];
            // 去重简单去重，保持最后一个特殊多订阅展示
            const uniqueEx = [];
            const setEx = new Set();
            for (let ex of enhancedExamples) {
                if (!setEx.has(ex)) {
                    setEx.add(ex);
                    uniqueEx.push(ex);
                }
            }
            container.innerHTML = '';
            uniqueEx.forEach((example, idx) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'example-item';
                // 构建可读结构
                const codeSpan = document.createElement('code');
                codeSpan.style.display = 'block';
                codeSpan.style.wordBreak = 'break-all';
                codeSpan.style.whiteSpace = 'pre-wrap';
                codeSpan.style.fontSize = '0.78rem';
                codeSpan.textContent = example;
                const descSpan = document.createElement('div');
                descSpan.style.fontSize = '0.7rem';
                descSpan.style.marginTop = '6px';
                descSpan.style.color = '#3a6b8f';
                if (example.includes('target=v2ray')) descSpan.textContent = '➜ 转换为 v2ray 标准格式 (URI)';
                else if (example.includes('target=clash')) descSpan.textContent = '➜ 转换为 Clash 传统配置';
                else if (example.includes('target=singbox')) descSpan.textContent = '➜ 转换为 Sing-Box 节点格式';
                else if (example.includes('target=clash.meta')) descSpan.textContent = '➜ 转换为 Clash.Meta 增强格式 + 多订阅合并示例';
                else descSpan.textContent = '➜ 直接可用的请求路径，需拼接至 Worker 域名后';

                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = '复制链接';
                copyBtn.style.marginLeft = '12px';
                copyBtn.style.float = 'right';
                copyBtn.onclick = (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(example);
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = '✓ 已复制';
                    setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
                };
                const headerDiv = document.createElement('div');
                headerDiv.style.display = 'flex';
                headerDiv.style.alignItems = 'center';
                headerDiv.style.justifyContent = 'space-between';
                headerDiv.appendChild(copyBtn);
                itemDiv.appendChild(headerDiv);
                itemDiv.appendChild(codeSpan);
                itemDiv.appendChild(descSpan);
                container.appendChild(itemDiv);
            });

            // 添加一个手动的额外说明块
            const noteBlock = document.createElement('div');
            noteBlock.style.marginTop = '12px';
            noteBlock.style.fontSize = '0.75rem';
            noteBlock.style.background = '#eef3fc';
            noteBlock.style.borderRadius = '14px';
            noteBlock.style.padding = '8px 12px';
            noteBlock.innerHTML = '🔁 <strong>多订阅组合</strong> :  url参数中使用英文逗号拼接多个编码后的订阅地址，例如上面的 clash.meta 示例。<br>📌 注意所有订阅都需要单独进行 URL 编码，整个 url 参数值也要符合 URI 规范。';
            container.appendChild(noteBlock);
        }

        // 复制基础示例路径 ( /?target=v2ray&url=UrlEncode(...) )
        function setupCopyBase() {
            const btn = document.getElementById('copyBaseExample');
            if (btn) {
                btn.addEventListener('click', () => {
                    const baseExample = '/?target=v2ray&url=UrlEncode(编码后的订阅)';
                    navigator.clipboard.writeText(baseExample);
                    const original = btn.textContent;
                    btn.textContent = '✅ 已复制';
                    setTimeout(() => { btn.textContent = original; }, 1500);
                });
            }
        }

        // 可选展示更丰富的 usage 元数据
        function buildAdditionalInfo() {
            // 在左卡片中增加更详细的参数url说明以及实际转换小贴士
            const paramBlocks = document.querySelectorAll('.param-block');
            if (paramBlocks.length >= 2) {
                // 已经足够，不重复加
            }
            const urlDescDiv = document.createElement('div');
            urlDescDiv.style.marginTop = '12px';
            urlDescDiv.style.fontSize = '0.75rem';
            urlDescDiv.style.background = '#eef2f7';
            urlDescDiv.style.padding = '8px 12px';
            urlDescDiv.style.borderRadius = '14px';
            urlDescDiv.innerHTML = '📎 <strong>URL编码说明</strong> : 请使用 encodeURIComponent 对原始订阅链接进行编码。例如原始订阅 https://example.com/sub?token=abc → 编码后 https%3A%2F%2Fexample.com%2Fsub%3Ftoken%3Dabc';
            const leftCardContent = document.querySelector('.grid-2col .card:first-child .card-content');
            if (leftCardContent && !leftCardContent.querySelector('.extra-url-note')) {
                urlDescDiv.classList.add('extra-url-note');
                leftCardContent.appendChild(urlDescDiv);
            }
        }

        // 添加一些tooltip效果和友好提示
        function initUI() {
            renderTargetTags('targetTagsContainer', 14);
            renderFullTargetList();
            renderExamples();
            setupCopyBase();
            buildAdditionalInfo();

            // 动态显示完整的target字符串支持（原message）
            const versionElement = document.querySelector('.version-badge span');
            if (versionElement) versionElement.textContent = usageData.version;
            const heroMessage = document.querySelector('.message');
            if (heroMessage) heroMessage.innerHTML = \`✨ \${usageData.message}\`;

            // 加一点footer动态年份
            const footer = document.querySelector('.footer-note');
            if (footer) {
                const year = new Date().getFullYear();
                footer.innerHTML = \`⚡ SubStore Worker 版 · 仅转换节点 | 标准API风格 <code>/?target=&url=</code> | 兼容所有主流代理软件 · 由 Cloudflare 驱动 · \${year}\`;
            }
        }

        initUI();
    </script>
</body>

</html>
    `
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
}