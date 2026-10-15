---
title: 文档维护
order: 2
toc: content
---

# 文档维护

本站采用人工更新策略，不自动跟踪 CLI、模板、gz-pc 或 gz-ui-web 仓库。

CLI 的发布与模板变更统一记录在本站[更新日志](/changelog)，`gz-cli-front` 仓库不再单独维护 changelog。

## 何时更新

以下变化需要同步文档：

- CLI 新增、删除或修改命令和参数。
- Node.js、包管理器或鉴权要求变化。
- 增加模板，或模板选择方式发生变化。
- 模板目录、运行命令、Garfish 接入方式有重要调整。
- gz-pc 公开入口、参数、响应或错误行为变化。
- gz-ui-web 包名、安装方式或文档地址变化。
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
| CLI 版本和安装方式 | `gz-cli-front/package.json`、`README.md` |
| 命令和参数 | `gz-cli-front/src/index.ts` |
| 运行时机制 | `gz-cli-front/src/commands`、`src/utils` |
| 模板能力 | 对应模板仓库的 `package.json`、`README.md`、`docs` |
| gz-pc API | `gz-pc/src`、`package.json`、`README.md` |
| gz-ui-web | 组件库 `package.json`、dumi 文档 |

## 更新验收

1. 示例命令可以执行，包名与参数无误。
2. 示例 TypeScript 与当前公开类型一致。
3. 公网内容不包含内部敏感信息。
4. 首页、导航、站内搜索和深层链接正常。
5. `npm run build` 和 `npm run build:internal` 成功，核对两份产物中的配套工具链接。
6. 公网与内网地址分别抽查。

## 文档站部署

本站使用同一代码库分别构建并发布到公网与公司内网：

| 环境 | 构建命令 | 发布目录 | 预览命令 |
| --- | --- | --- | --- |
| 公网 | `npm run build` | `dist/` | `npm run preview` |
| 内网 | `npm run build:internal` | `dist-internal/` | `npm run preview:internal` |

内外网链接统一维护在 `config/environments.json` 的 `externalLinks` 中，导航和正文共用当前构建环境的配置。新增差异链接时，在两套配置中增加同名字段，正文使用 `<ExternalDocLink name="链接配置名" />` 引用。

部署在二级路径时，通过 `DOCS_BASE` 设置资源前缀，并让静态服务将页面路由回退到 `index.html`。`DOCS_ORIGIN` 可指定分享预览图的站点 Origin，两种构建都支持这两个变量。请发布对应环境的产物目录。

| 资源 | 当前构建环境对应地址 |
| --- | --- |
| gz-ui-web 组件文档 | <ExternalDocLink name="gzUiWeb" /> |
