## 输出类型说明

此工具支持将订阅链接转换为多种格式的配置文件，以下是支持的输出类型及其相关说明：

* **qx** / **QX** / **QuantumultX**
  Quantumult X 客户端的配置文件格式。

* **surge** / **Surge** / **SurgeMac**
  Surge 客户端的配置文件格式。

* **Loon**
  Loon 客户端的配置文件格式。

* **Clash** / **clash**
  Clash 客户端的配置文件格式。

* **meta** / **clashmeta** / `'clash.meta'` / `'Clash.Meta'` / **ClashMeta**
  ClashMeta 配置文件格式，用于集成多种节点设置。

* **mihomo** / **Mihomo**
  Mihomo 客户端的配置文件格式。

* **uri** / **URI**
  URL 格式的订阅链接类型。

* **v2** / **v2ray** / **V2Ray**
  V2Ray 客户端的配置文件格式。

* **json** / **JSON**
  通用的 JSON 格式配置文件。

* **stash** / **Stash**
  Stash 客户端的配置文件格式。

* **shadowrocket** / **Shadowrocket** / **ShadowRocket**
  Shadowrocket 客户端的配置文件格式。

* **surfboard** / **Surfboard**
  Surfboard 客户端的配置文件格式。

* **singbox** / **'sing-box'**
  Singbox 客户端的配置文件格式。

* **egern** / **Egern**
  Egern 客户端的配置文件格式。

* **v2rayng** / **V2rayNG**
  V2RayNG 客户端的配置文件格式。

* **ssr** / **SSR**
  ShadowsocksR 客户端的配置文件格式。

* **trojan** / **Trojan**
  Trojan 客户端的配置文件格式。

* **brook** / **Brook**
  Brook 客户端的配置文件格式。

* **frp** / **FRP**
  FRP 客户端的配置文件格式。

* **ngrok** / **Ngrok**
  Ngrok 客户端的配置文件格式。

* **vmess** / **VMess**
  VMess 协议的配置文件格式。

* **ss** / **Shadowsocks**
  Shadowsocks 客户端的配置文件格式。

* **http** / **HTTP**
  HTTP 类型的配置文件格式。

---

## 使用方式

通过此工具，您可以将多个订阅链接转换为不同格式的配置文件。只需选择目标格式（`target`）并提供编码后的订阅链接。

### 输入参数：

* **target**: 输出类型（支持上面列出的各种类型，如 `singbox`、`mihomo`、`v2ray` 等）。
* **url**: 输入编码后的订阅链接，多个订阅链接可用 `,` 分隔。

### 示例：

1. **V2Ray 配置生成**
   请求示例：
   `/?target=v2ray&url=UrlEncode(编码后的订阅链接)`
   该请求将返回 V2Ray 格式的配置文件。

2. **Singbox 配置生成**
   请求示例：
   `/?target=singbox&url=UrlEncode(编码后的订阅链接)`
   该请求将返回 Singbox 格式的配置文件。

3. **Shadowsocks 配置生成**
   请求示例：
   `/?target=ss&url=UrlEncode(编码后的订阅链接)`
   该请求将返回 Shadowsocks 格式的配置文件。
