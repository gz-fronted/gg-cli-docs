---
title: 请求与初始化
order: 2
toc: content
---

# gzFetch

## 初始化默认实例

应用启动阶段统一配置一次，在页面请求发出前调用。下面的初始化配置按 micro-app 模板组织：

```ts
import { configureGzFetch } from '@gz-fronted/gz-pc/fetch';
import { useGlobalStore } from '@/store/useGlobalStore';

configureGzFetch({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  getToken: () => useGlobalStore.getState().token ?? undefined,
  showErrorMessage: true,
  unauthorized: {
    enabled: true,
  },
});
```

Garfish 重新挂载时可以覆盖上次配置。`configureGzFetch` 会替换默认客户端，配置不会与上一次
自动合并。普通业务模块不应重复调用初始化，也不应自行创建请求实例。

配置前调用 `gzFetch` 会抛出“尚未配置”的错误。`getToken` 每次请求前动态读取，库不自动读取
localStorage；模板由启动流程和 Store 管理 Token。

`unauthorized.enabled` 的库默认值为 `false`，只有业务项目显式开启后才统一处理 401。
gg-cli 的 micro-app 模板已经显式开启，并在根主题节点接入反馈 Provider。

## 接入反馈 Provider

在 gg-ui `ConfigProvider` 内挂载一次 `GzFetchFeedbackProvider`：

```tsx | pure
import { ConfigProvider } from '@chenhui996/gg-ui';
import { GzFetchFeedbackProvider } from '@gz-fronted/gz-pc/fetch';

<ConfigProvider themeMode={themeMode}>
  <GzFetchFeedbackProvider>{children}</GzFetchFeedbackProvider>
</ConfigProvider>;
```

Provider 负责普通错误 message 和 401 Modal，并复用当前 gg-ui 上下文实时跟随亮色、暗色主题。
micro-app 模板已完成接入，业务页面无需重复挂载。已有项目的完整接入、旧 Modal 迁移、SSO、
配置默认值和本地调试见[请求反馈与 401](/gz-pc/feedback)。

## 业务请求

统一使用配置对象：

```ts
import { gzFetch } from '@gz-fronted/gz-pc/fetch';

interface UserQuery {
  id: string;
}

interface UserDetail {
  id: string;
  name: string;
}

export const getUser = (params: UserQuery): Promise<UserDetail> =>
  gzFetch<UserDetail, UserQuery>({
    url: '/user/detail',
    method: 'GET',
    params,
  });
```

第一个泛型是响应数据，第二个泛型是请求参数。

## 参数映射

| Method | `params` 发送位置 |
| --- | --- |
| GET、DELETE | URL Query |
| POST、PUT | Request Body |

业务代码不使用 Axios 的 `data` 字段，也不混用 `gzFetch.get/post` 等快捷方法。

## 单次请求配置

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 请求地址，必填 |
| `method` | `GET \| POST \| PUT \| DELETE` | 请求方法，必填 |
| `params` | 泛型参数 | Query 或 Body |
| `headers` | `Record<string, string>` | 附加请求头 |
| `timeout` | `number` | 单次超时，单位毫秒 |
| `showErrorMessage` | `boolean` | 是否显示统一错误提示 |
| `skipAuth` | `boolean` | 是否跳过 Token 注入 |
| `responseType` | `json \| blob \| text` | 响应类型 |
| `signal` | `AbortSignal` | 标准请求取消信号 |
| `withCredentials` | `boolean` | 是否携带跨域 Cookie 等凭证 |

## 初始化配置

类型为 `CreateGzFetchOptions`，用于 `configureGzFetch` 和 `createGzFetch`。
以下是库默认值；micro-app 模板覆盖超时为 `10000ms`，并显式开启 unauthorized。

| 字段 | 类型 | 库默认值 | 说明 |
| --- | --- | --- | --- |
| `baseURL` | `string` | 未设置 | API 基础地址 |
| `timeout` | `number` | `15000` | 超时，单位毫秒 |
| `getToken` | `() => string \| undefined \| Promise<string \| undefined>` | 未设置 | 每次请求前获取 Token |
| `showErrorMessage` | `boolean` | `true` | 普通错误 message 开关，不控制 401 Modal |
| `validateStatus` | `(status: number) => boolean` | 所有 `2xx` | 自定义 HTTP 成功状态范围 |
| `auth.headerName` | `string` | `'Authorization'` | Token 请求头名 |
| `auth.formatToken` | `(token: string) => string` | `Bearer <token>` | Token 格式化 |
| `unauthorized` | `GzFetchUnauthorizedOptions` | `enabled: false` | [401 配置与反馈](/gz-pc/feedback) |
| `middlewares` | `readonly GzFetchMiddleware[]` | 空数组 | 请求、响应和错误中间件 |

单次请求只支持上表之前列出的 `GzRequestConfig` 字段，**不会自动透传任意 Axios 配置**。
`withCredentials` 已显式支持；`paramsSerializer`、`onUploadProgress` 等暂未开放。
`unauthorized` 和 `validateStatus` 只能在实例初始化时配置。

跨域 Cookie 请求示例：

```ts
await gzFetch<void>({
  url: '/session/check',
  method: 'GET',
  withCredentials: true,
});
```

该字段只控制客户端凭证发送，跨域仍需服务端正确配置 CORS 与 Cookie 策略。

## Token

`getToken` 会在每次请求前执行，因此可以取得最新 Token：

```ts
configureGzFetch({
  getToken: () => tokenStore.get(),
  auth: {
    headerName: 'Authorization',
    formatToken: (token) => `Bearer ${token}`,
  },
});
```

公开接口使用 `skipAuth: true`，不要通过传入空 Token 模拟公开请求。

## 独立实例

`createGzFetch` 仅用于多后端服务、独立 baseURL、独立 Token 或独立中间件链：

```ts
import { createGzFetch } from '@gz-fronted/gz-pc/fetch';

const reportingFetch = createGzFetch({
  baseURL: '/reporting-api',
  getToken: () => reportingToken,
});
```

普通业务模块不要为每个领域创建一个请求实例。独立客户端不会继承默认客户端的初始化配置，
如需 401 处理，必须在自己的 `createGzFetch` 中显式开启 `unauthorized.enabled`。
多个客户端可共用根反馈 Provider；共享范围见[并发说明](/gz-pc/feedback)。
