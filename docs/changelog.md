---
title: 更新日志
order: 3
toc: content
---

# 更新日志

## gz-cli-front 1.0.2 - 2026-10-16

- `gz-cli-front` 新增 `gz-cli init --internal`（简写 `-i`），使用随 CLI 发布的微应用模板，无需访问 GitHub；依赖安装仍需可用的 npm 源。

## gg-cli-template-micro-app - 2026-10-15

- 模板升级 `gz-pc@0.2` 和 `gz-ui-web`。
- 模板增加开发阶段的壳子能力。

## gz-pc 0.2.0 - 2026-10-15

- 反馈组件依赖由 `@chenhui996/gg-ui` 切换为 `gz-ui-web`，宿主需使用 React 19 和 `gz-ui-web@^1.0.1`。
- 新增实例级配置 `preserveNumberPrecision`（默认关闭），可通过 `configureGzFetch` 全局开启；超出安全范围的整数和转换时会丢失精度的小数保留为原始字符串，普通数字与已有字符串不变。
- 精度保护同时适用于成功和 HTTP 错误响应；显式文本和 Blob 下载不参与转换。

## gz-cli-front 1.0.1 - 2026-10-15

- 新增 `gz-cli` 主命令，支持 `gz-cli init` 和 `gz-cli create`，保留 `gz-cli-front` 兼容入口。
- 更新安装与旧包迁移说明；安装包名仍为 `gz-cli-front`，不注册旧的 `gg-cli` 命令。

## gz-cli-front 1.0.0 - 2026-10-10

- 以 `gz-cli-front` 独立包正式发布，通过远程模板创建项目。

## gz-pc 0.1.2 - 2026-09-11

### Changes

- `gzFetch` 的 DELETE 请求现在默认将 `params` 放入 Request Body；GET 仍使用 URL Query，POST、PUT 仍使用 Request Body。
- 对明确依赖 DELETE Query 参数的历史或特殊接口，可设置 `paramsInUrl: true`，此时参数只发送到 URL Query，不再重复发送 Request Body。
- 这是 DELETE 默认参数位置的行为变更。已有项目升级前需检查现有 DELETE 接口，并为仍要求 Query 的调用显式增加 `paramsInUrl: true`。

## gz-pc 0.1.1 - 2026-09-07

### Changes

- 新增可选的 HTTP 401 登录失效弹窗（gz-pc 库默认关闭）和统一错误反馈 Provider。
- 弹窗与错误提示支持跟随应用主题。
- micro-app 模板同步接入请求反馈，默认开启 401 处理。

已有项目接入见[请求反馈与 401](/gz-pc/feedback)。
