# 安装与使用指南

## ✨ 特性概述

- 🔄 多格式支持：Quantumult X、Surge、Clash、V2Ray 等主流代理客户端
- 🌐 多订阅合并：支持多个订阅链接合并转换
- 🚀 快速部署：一键部署到 Cloudflare Workers
- 📦 开箱即用：简单易用的 API 接口

## 🛠 前置要求

确保您的系统已安装以下环境：

- **Node.js** (推荐 16.x 或更高版本)
- **包管理器**：npm / pnpm / yarn
- **Cloudflare 账号** (如需部署为 Workers)

## 📦 安装步骤

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式运行

```bash
pnpm dev
```

### 3. 构建项目

```bash
pnpm build
```

### 4. 部署到 Cloudflare Workers

```bash
pnpm deploy
```

## 🌟 API 使用说明

### 核心参数

#### 🎯 `target` 参数
指定输出配置类型，支持以下格式：

| 目标客户端 | 支持的参数值 |
|-----------|-------------|
| **Quantumult X** | `qx`, `QX`, `QuantumultX` |
| **Surge** | `surge`, `Surge`, `SurgeMac` |
| **Loon** | `Loon` |
| **Clash** | `Clash` |
| **Clash Meta** | `meta`, `clashmeta`, `'clash.meta'`, `'Clash.Meta'`, `ClashMeta`, `mihomo`, `Mihomo` |
| **URL链接** | `uri`, `URI` |
| **V2Ray** | `v2`, `v2ray`, `V2Ray` |
| **JSON** | `json`, `JSON` |
| **Stash** | `stash`, `Stash` |
| **Shadowrocket** | `shadowrocket`, `Shadowrocket`, `ShadowRocket` |
| **Surfboard** | `surfboard`, `Surfboard` |
| **Sing-box** | `singbox`, `'sing-box'` |
| **Egern** | `egern`, `Egern` |

#### 🔗 `url` 参数
输入订阅链接（需进行 URL 编码处理），多个订阅链接可用英文逗号分隔。

## 🚀 使用示例

### 基本请求格式

```
/?target=目标格式&url=编码后的订阅链接
```

### 示例请求

**示例 1：单个订阅转换**
```
/?target=v2ray&url=https%3A%2F%2Fexample.com%2Fsubscription
```

**示例 2：多个订阅合并转换**
```
/?target=clash&url=https%3A%2F%2Fexample.com%2Fsubscription1,https%3A%2F%2Fexample.com%2Fsubscription2
```

## ⚠️ 重要注意事项

1. **URL 编码要求**：所有订阅链接必须进行 URL 编码处理
2. **参数顺序**：`target` 和 `url` 参数的顺序可以交换
3. **分隔符**：多个订阅链接使用英文逗号分隔，不要添加空格
4. **兼容性**：服务支持各种主流代理客户端的配置格式

## 🔧 编码工具推荐

您可以使用以下方式进行 URL 编码：

- 🌐 在线 URL 编码工具
- 💻 编程语言内置函数（如 JavaScript 的 `encodeURIComponent()`）
- 🛠 浏览器开发者工具控制台

**编码示例：**
- 原始链接：`https://example.com/subscription`
- 编码后：`https%3A%2F%2Fexample.com%2Fsubscription`

## 💻 开发集成示例

### 转换入口示例代码

```javascript
import processNodeConversion from './src/index.js';

(async () => {
    const result = await processNodeConversion(
        [
            'https://example.com/sub1',
            'https://example.com/sub2'
        ], 
        'mihomo'
    );
    
    console.log(result.data); // 输出转换后的配置
})();
```

## 📄 许可证

本项目遵循 **GNU General Public License V3 (GPL V3)** 开源许可证。

## 🙏 致谢

本项目受到 [Sub-Store](https://github.com/sub-store-org/Sub-Store) 的启发，部分代码逻辑参考了该项目的实现。

## 🤝 贡献指南

我们欢迎各种形式的贡献！在提交 Issues 或 Pull Requests 前，请确保：

1. 📝 遵循代码风格规范
2. 💬 添加适当的注释和文档
3. 🧪 测试您的更改

## 🔒 使用声明

- ⚖️ 本项目仅用于学习和研究目的
- 📜 使用时请遵守相关法律法规
- 🔐 请确保您有权利使用相关的订阅源

---

如果您觉得这个项目对您有帮助，请给它一个 ⭐ Star 支持！