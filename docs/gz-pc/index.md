---
title: gz-pc 概览
order: 1
toc: content
---

# @gz-fronted/gz-pc

`gz-pc` 是业务项目的通用开发工具包，主要提供统一请求、Hooks 和轻量工具函数。

功能更新与 micro-app 适配情况见[更新日志](/changelog)。

## 开发时先记住

- 接口统一使用 `@gz-fronted/gz-pc/fetch`，不要在页面中直接调用 Axios。
- Hooks 从 `@gz-fronted/gz-pc/hooks` 导入。
- 日期和 Query 处理优先使用 `@gz-fronted/gz-pc/utils`。
- 必须写明子路径，不从包根路径导入。

## 安装

gg-cli 生成的项目已经包含所需依赖，通常不需要再次安装。仅在已有项目手动接入时执行：

```bash
npm install @gz-fronted/gz-pc react @chenhui996/gg-ui
```

React 和 gg-ui 是 peer dependencies；Axios 与 ahooks 随 gz-pc 安装。

## 本次请求能力更新

本次 `0.1.1` 功能对应以下使用变化：

- 可选的 HTTP 401 登录失效处理，库默认关闭，micro-app 模板显式开启。
- 根节点 `GzFetchFeedbackProvider` 同时承载 gg-ui message 和 Modal，继承当前主题。
- 同一份 gz-pc 模块中的多个客户端共享 401 弹窗状态。
- 支持单次请求 `withCredentials`、实例级 `validateStatus`，默认接受所有 HTTP `2xx`。

已有项目升级后，按[请求反馈与 401](/gz-pc/feedback)完成配置与 Provider 接入。
只升级包不会自动开启弹窗；已有 `GzFetchUnauthorizedModal` 接入可按同页说明迁移。

## 常用导入

```ts
import {
  configureGzFetch,
  GzFetchFeedbackProvider,
  gzFetch,
} from '@gz-fronted/gz-pc/fetch';
import { useRequest } from '@gz-fronted/gz-pc/hooks';
import { formatDate } from '@gz-fronted/gz-pc/utils';
```

不要省略子路径：

```ts
// 错误示例
import { gzFetch } from '@gz-fronted/gz-pc';
```

## 子路径能力

| 子路径 | 内容 | 是否依赖 React |
| --- | --- | --- |
| `/fetch` | 请求配置、默认实例、独立实例、错误、反馈 Provider 与中间件 | 反馈 Provider 依赖 React 和 gg-ui |
| `/hooks` | 统一透传 ahooks 的公开 API | 是 |
| `/utils` | 日期格式化、Query 转换 | 否 |

## 业务开发约定

- API 函数集中放在项目的 `src/api`，并声明请求和响应类型。
- baseURL、Token 和统一错误提示在应用启动阶段配置一次；反馈 Provider 在主题根节点挂载一次。
- 普通业务模块不要重复初始化，也不要为每个页面创建请求实例。
- 遇到通用需求先确认 gz-pc 是否已有能力，避免项目重复实现。

第一次使用建议直接查看[请求示例](/gz-pc/fetch)；后端未就绪时查看[声明式 Mock](/gz-pc/mock)。
