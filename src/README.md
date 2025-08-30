# 订阅转换服务使用说明

## 参数说明

### target 参数
指定输出配置类型，支持以下格式：

| 目标类型 | 支持的参数值 |
|---------|------------|
| Quantumult X | `qx`, `QX`, `QuantumultX` |
| Surge | `surge`, `Surge`, `SurgeMac` |
| Loon | `Loon` |
| Clash | `Clash` |
| Clash Meta | `meta`, `clashmeta`, `'clash.meta'`, `'Clash.Meta'`, `ClashMeta`, `mihomo`, `Mihomo` |
| 通用链接 | `uri`, `URI` |
| V2Ray | `v2`, `v2ray`, `V2Ray` |
| JSON | `json`, `JSON` |
| Stash | `stash`, `Stash` |
| Shadowrocket | `shadowrocket`, `Shadowrocket`, `ShadowRocket` |
| Surfboard | `surfboard`, `Surfboard` |
| Sing-box | `singbox`, `'sing-box'` |
| Egern | `egern`, `Egern` |

### url 参数
输入订阅链接（需进行 URL 编码处理），多个订阅链接可用英文逗号分隔。

## 使用示例

**基本格式：**
```
/?target=目标格式&url=编码后的订阅链接
```

**示例 1：单个订阅转换**
```
/?target=v2ray&url=https%3A%2F%2Fexample.com%2Fsubscription
```

**示例 2：多个订阅合并转换**
```
/?target=clash&url=https%3A%2F%2Fexample.com%2Fsub1%2Chttps%3A%2F%2Fexample.com%2Fsub2
```

## 注意事项

1. **URL 编码要求**：所有订阅链接必须进行 URL 编码处理
2. **参数顺序**：`target` 和 `url` 参数的顺序可以交换
3. **分隔符**：多个订阅链接使用英文逗号分隔，不要添加空格
4. **兼容性**：服务支持各种主流代理客户端的配置格式

## 编码工具推荐

您可以使用以下方式进行 URL 编码：
- 在线 URL 编码工具
- 编程语言内置函数（如 JavaScript 的 `encodeURIComponent()`）
- 浏览器开发者工具控制台

**示例编码：**
原始链接：`https://example.com/subscription`
编码后：`https%3A%2F%2Fexample.com%2Fsubscription`