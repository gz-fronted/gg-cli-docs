---
title: gz-pc 概览
order: 1
toc: content
---

# @gz-fronted/gz-pc

`gz-pc` 是业务项目的通用开发工具包，主要提供统一请求、Hooks 和轻量工具函数。

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

## 常用导入

```ts
import { configureGzFetch, gzFetch } from '@gz-fronted/gz-pc/fetch';
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
| `/fetch` | 请求配置、默认实例、独立实例、错误与中间件 | 否；错误提示可使用 gg-ui |
| `/hooks` | 统一透传 ahooks 的公开 API | 是 |
| `/utils` | 日期格式化、Query 转换 | 否 |

## 业务开发约定

- API 函数集中放在项目的 `src/api`，并声明请求和响应类型。
- baseURL、Token 和统一错误提示在应用启动阶段配置一次。
- 普通业务模块不要重复初始化，也不要为每个页面创建请求实例。
- 遇到通用需求先确认 gz-pc 是否已有能力，避免项目重复实现。

第一次使用建议直接查看[请求示例](/gz-pc/fetch)；后端未就绪时查看[声明式 Mock](/gz-pc/mock)。
