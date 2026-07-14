import processNodeConversion from './sub.js';
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const target = url.searchParams.get('target');
        const inputnode = url.searchParams.get('url');
        const api = url.searchParams.get('api');
        const heruser = url.searchParams.get('heruser');
        const nodeArray = inputnode ? inputnode.split(/[,|]/) : [];
        if (target && nodeArray) {
            try {
                const result = await processNodeConversion(nodeArray, target, api, heruser);
                let data = result.data;
                if (typeof data == 'object') {
                    data = JSON.stringify(data);
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
        title: '⚡ SubStore 节点转换工具',
        message: '这是一个基于 Cloudflare Workers 的 sub-store 节点转换工具，仅转换节点用',
        params: {
            target: {
                icon: '🎯',
                title: '输出类型',
                value: 'singbox|mihomo|v2ray|base64|qx|QX|QuantumultX|surge|Surge|SurgeMac|Loon|Clash|meta|clashmeta|clash.meta|Clash.Meta|ClashMeta|Mihomo|uri|URI|json|JSON|stash|Stash|shadowrocket|Shadowrocket|ShadowRocket|surfboard|Surfboard|egern|Egern',
            },
            url: {
                icon: '🔗',
                title: '订阅链接',
                value: '输入编码后的订阅链接，多个订阅可用英文逗号(,)分隔',
            },

            api: {
                icon: '📡',
                title: 'API',
                value: '返回 names 信息',
            },
            heruser: {
                icon: '📊',
                title: '流量信息',
                value: '返回用户流量信息',
            },
        },
        example: '/?target=v2ray&url=UrlEncode(编码后的订阅)',
        examples: [
            {
                url: '/?target=v2ray&url=https%3A%2F%2Fexample.com%2Fsubscription',
                desc: '转换为 V2Ray 格式',
            },
            {
                url: '/?target=clash&url=https%3A%2F%2Fexample.com%2Fsubscription',
                desc: '转换为 Clash 格式',
            },
            {
                url: '/?target=v2ray&api=true&url=https%3A%2F%2Fexample.com',
                desc: '返回订阅名称信息',
            },
            {
                url: '/?target=v2ray&heruser=true&url=https%3A%2F%2Fexample.com',
                desc: '返回用户流量信息',
            },
        ],
    };

    const extractTargets = (value) => {
        const match = value.match(/(.*)/);

        if (!match) return [];

        return value.split('|').map((i) => i.trim());
    };

    const renderTags = (list) => {
        return list.map((item) => `<span class="tag">${item}</span>`).join('');
    };

    const renderParams = (params) => {
        return Object.entries(params)

            .map(([key, item]) => {
                let content;

                if (key === 'target') {
                    content = `
                    <div class="target-tags">
                        ${renderTags(extractTargets(item.value))}
                    </div>
                    `;
                } else {
                    content = `
                    <div class="value">
                        ${item.value}
                    </div>
                    `;
                }

                return `

                <div class="param-block">

                    <span class="param-label">

                        ${item.icon}

                        ${key}

                        ·

                        ${item.title}

                    </span>


                    ${content}


                </div>

                `;
            })

            .join('');
    };

    const renderExamples = (examples) => {
        return examples

            .map((item) => {
                return `

                <div class="example-item">


                    <code>
                        ${item.url}
                    </code>


                    <div class="example-desc">

                        ${item.desc}

                    </div>


                    <button
                    class="copy-btn"
                    onclick="
                    navigator.clipboard.writeText('${item.url}')
                    "
                    >

                    复制

                    </button>


                </div>

                `;
            })

            .join('');
    };

    const html = `

<!DOCTYPE html>

<html lang="zh-CN">


<head>

<meta charset="UTF-8">


<meta name="viewport"
content="width=device-width,initial-scale=1">


<title>
${data.title}
</title>


<style>


*{
box-sizing:border-box;
margin:0;
padding:0;
}



body{

background:
linear-gradient(
145deg,
#f6f9fc,
#eef2f5
);

font-family:
system-ui,
-apple-system,
Segoe UI,
Roboto;

color:#1a2c3e;

padding:30px;

}



.container{

max-width:1200px;

margin:auto;

}



.hero{


background:
rgba(255,255,255,.8);

border-radius:30px;

padding:30px;

margin-bottom:25px;

box-shadow:
0 10px 30px #0001;


}



.version{

display:inline-block;

padding:6px 15px;

border-radius:20px;

background:#e8f0fa;

color:#14517c;

margin-bottom:15px;

}



h1{

font-size:36px;

margin-bottom:15px;

}



.message{

font-size:18px;

border-left:
4px solid #3b82f6;

padding-left:15px;

}



.grid{


display:grid;

grid-template-columns:
repeat(auto-fit,minmax(350px,1fr));

gap:20px;

}



.card{


background:white;

border-radius:25px;

overflow:hidden;

box-shadow:
0 8px 25px #0001;


}



.card-header{


padding:20px;

font-size:22px;

font-weight:600;

border-bottom:
1px solid #eee;


}



.card-content{

padding:20px;

}



.param-block{


background:#f8fafd;

border-radius:18px;

padding:15px;

margin-bottom:15px;


}



.param-label{


font-weight:700;

display:block;

margin-bottom:10px;


}



.target-tags{


display:flex;

flex-wrap:wrap;

gap:8px;


}



.tag{


padding:5px 12px;

background:#eef2f9;

border-radius:20px;

font-size:13px;

color:#1f6392;


}



.example-item{


background:#f1f5f9;

border-radius:15px;

padding:15px;

margin-bottom:12px;

word-break:break-all;


}



.example-desc{


margin-top:8px;

font-size:13px;

color:#527c9a;


}



.copy-btn{


margin-top:10px;

border:0;

background:#e8f0fa;

padding:5px 15px;

border-radius:20px;

cursor:pointer;


}



.footer{


margin-top:25px;

text-align:center;

padding:20px;

background:white;

border-radius:25px;

}


</style>


</head>



<body>


<div class="container">


<div class="hero">


<div class="version">

${data.version}

</div>



<h1>

${data.title}

</h1>



<div class="message">

📡 ${data.message}

</div>



</div>



<div class="grid">


<div class="card">


<div class="card-header">

⚙️ 转换参数

</div>


<div class="card-content">

${renderParams(data.params)}


</div>


</div>



<div class="card">


<div class="card-header">

📋 调用示例

</div>


<div class="card-content">


${renderExamples(data.examples)}


</div>


</div>



</div>


<div class="footer">

⚡ SubStore Worker
|
API:
<code>
/?target=&url=
</code>

</div>


</div>


</body>


</html>

`;

    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html;charset=utf-8',
        },
    });
}
