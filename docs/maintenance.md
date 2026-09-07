---
title: 文档维护
order: 2
toc: content
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

## gz-pc 与 micro-app 更新流程

1. 确认 gz-pc 版本与 micro-app 适配完成，验证新建项目的请求反馈、主题和构建。
2. 更新受影响的 API、请求示例和模板说明。
3. 在[更新日志](/changelog)顶部按“gz-pc 版本 - 日期”新增记录，用几条列表说明功能与模板变化；有迁移要求时链接到接入文档。
4. 执行下方验收，构建并发布文档站。

更新日志只记录使用者关心的变化，未发布内容放在 `Unreleased` 下。已有项目不会随模板自动更新，需按接入文档调整。

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

## 文档站部署

本站使用同一代码库分别发布到公网与公司内网。公网可部署到 Vercel，内网将构建后的 `dist/` 交给静态资源服务器。

```text
Build Command: pnpm build
Output Directory: dist
```

部署在二级路径时，通过 `DOCS_BASE` 设置资源前缀，并让静态服务将页面路由回退到 `index.html`。内外网都使用域名根路径时，可以复用同一份 `dist/`。

| 资源 | 公网地址 | 内网地址 |
| --- | --- | --- |
| gg-cli 文档站 | Vercel 域名待创建 | 内网域名、端口和路由待提供 |
| gg-ui 组件文档 | [https://gz-ui-cyan.vercel.app/](https://gz-ui-cyan.vercel.app/) | 待提供 |
