---
title: 更新日志
order: 3
toc: content
---

# 更新日志

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
