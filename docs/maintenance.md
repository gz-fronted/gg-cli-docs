---
title: 文档维护
order: 2
---

# 文档维护

本站采用人工更新策略，不自动跟踪 CLI、模板、gz-pc 或 gg-ui 仓库。

## 何时更新

以下变化需要同步文档：

- CLI 新增、删除或修改命令和参数。
- Node.js、包管理器或鉴权要求变化。
- 增加模板，或模板选择方式发生变化。
- 模板目录、运行命令、Garfish 接入方式有重要调整。
- gz-pc 公开入口、参数、响应或错误行为变化。
- gg-ui 包名、安装方式或文档地址变化。
- 公网或内网部署地址变化。

纯内部重构、测试补充和不影响使用者的修复通常不需要更新本站。

## 信息来源

| 内容 | 检查位置 |
| --- | --- |
| CLI 版本和安装方式 | `gg-cli/package.json`、`README.md` |
| 命令和参数 | `gg-cli/src/index.ts` |
| 运行时机制 | `gg-cli/src/commands`、`src/utils` |
| 模板能力 | 对应模板仓库的 `package.json`、`README.md`、`docs` |
| gz-pc API | `gz-pc/src`、`package.json`、`README.md` |
| gg-ui | 组件库 `package.json`、dumi 文档 |

## 更新验收

1. 示例命令可以执行，包名与参数无误。
2. 示例 TypeScript 与当前公开类型一致。
3. 公网内容不包含内部敏感信息。
4. 首页、导航、站内搜索和深层链接正常。
5. `pnpm build` 成功。
6. 公网与内网地址分别抽查。
