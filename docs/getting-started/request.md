---
title: 请求
order: 4
toc: content
---

# 请求

项目统一使用 gz-pc 提供的 `gzFetch`。它不仅封装了请求，还统一了初始化、Token 注入和参数传递方式，业务代码不要再单独创建 Axios 实例。

<div class="gz-callout">
  <strong>请求规范：</strong>应用启动时统一初始化一次 <code>gzFetch</code>；业务请求只使用 <code>params</code> 传参；Token 由初始化配置动态注入。
</div>

## 初始化 gzFetch

<div class="gz-callout">
  <strong>模板已经完成初始化：</strong>gg-cli 生成的 <code>micro-app</code> 已在 <code>src/bootstrap/configure-request.ts</code> 中配置 gzFetch，并由 <code>src/main.tsx</code> 在页面请求发出前调用。普通业务开发不需要再写一遍初始化代码。
</div>

模板默认配置如下，只有维护模板或调整全项目请求策略时才需要修改：

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

- `baseURL` 从当前环境变量读取，不在业务接口中拼接 Host。
- `getToken` 会在每次请求前执行，确保拿到最新 Token。
- 普通业务模块直接导入并使用 `gzFetch`，不重复调用 `configureGzFetch`。
- Garfish 应用重新挂载时，可以由应用入口覆盖上一次配置。
- 模板显式开启了统一 401 登录失效处理；gz-pc 库本身仍然默认关闭，已有项目升级后不会自动改变行为。

在初始化之前调用 `gzFetch` 会直接抛出“尚未配置”的错误，不会静默使用空配置，也不会自行读取 `localStorage`。

## 根节点请求反馈

micro-app 模板已经在 `AppThemeProvider` 的 gg-ui `ConfigProvider` 内挂载
`GzFetchFeedbackProvider`：

```tsx | pure
<ConfigProvider themeMode={themeMode}>
  <GzFetchFeedbackProvider>{children}</GzFetchFeedbackProvider>
</ConfigProvider>
```

它统一承载普通错误 message 和 401 Modal，使两者实时继承当前亮色或暗色主题。业务页面不需要
再次挂载 Provider，也不要对同一个请求错误重复调用 `message.error`。

## 初始化后的默认能力

| 能力 | 默认行为 |
| --- | --- |
| 请求超时 | `15000ms` |
| Token Header | `Authorization` |
| Token 格式 | `Bearer <token>` |
| 错误提示 | 默认开启，通过根节点 Provider 调用 gg-ui 的 `message.error` |
| 成功状态 | 所有 HTTP `2xx` 状态视为成功 |
| 成功响应 | 直接返回原始 `response.data` |
| HTTP 错误文案 | 优先读取响应体中的非空 `msg` |
| 取消请求 | 抛出 `CANCELED_ERROR`，不展示错误消息 |
| HTTP 401 | gz-pc 默认关闭；micro-app 模板显式开启全局单例登录失效弹窗 |

gzFetch 不判断业务 `code`，不自动解包响应中的 `data`，也不会转换分页、字段或日期。接口返回什么结构，API 函数就按什么结构声明响应类型。

## 初始化可选参数

`configureGzFetch` 接收以下配置。表中的“库默认值”指 gz-pc 自身未传配置时的行为，“模板配置”指 gg-cli 当前生成项目已经提供的值。

| 参数 | 模板配置 | 库默认值 | 说明 |
| --- | --- | --- | --- |
| `baseURL` | `VITE_API_BASE_URL` | 无 | 所有业务请求的基础地址 |
| `timeout` | `10000ms` | `15000ms` | 实例默认超时时间 |
| `getToken` | 从全局 Store 动态读取 | 无 | 每次请求前获取最新 Token |
| `showErrorMessage` | `true` | `true` | 是否默认调用 gg-ui 的 `message.error` |
| `validateStatus` | 沿用库默认值 | 所有 `2xx` | 自定义 HTTP 成功状态范围 |
| `auth.headerName` | 沿用库默认值 | `Authorization` | Token 使用的请求头名称 |
| `auth.formatToken` | 沿用库默认值 | `Bearer ${token}` | Token 写入请求头前的格式化方式 |
| `unauthorized` | `{ enabled: true }` | `{ enabled: false }` | HTTP 401 弹窗与登录处理 |
| `middlewares` | `[]` | `[]` | 按顺序执行的请求、响应和错误中间件 |

普通项目通常只需要配置 `baseURL` 和 `getToken`，其余参数按团队默认值运行。只有全项目都需要改变时，才在初始化层修改实例配置。

## 统一参数写法

无论请求方法是什么，业务代码都只传 `params`。gzFetch 会根据 Method 自动决定发送位置：

| Method | `params` 发送位置 |
| --- | --- |
| GET、DELETE | URL Query |
| POST、PUT | Request Body |

业务代码不要混用 Axios 的 `data`，也不要使用 `gzFetch.get()`、`gzFetch.post()` 等另一套调用方式。

```ts
import { gzFetch } from '@gz-fronted/gz-pc/fetch';

interface UserQuery {
  id: string;
}

interface UserDetail {
  id: string;
  name: string;
}

export const getUser = (params: UserQuery) =>
  gzFetch<UserDetail, UserQuery>({
    url: '/user/detail',
    method: 'GET',
    params,
  });
```

第一个泛型是响应数据，第二个泛型是请求参数。

## 单次请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | 是 | 业务请求路径；配置 `baseURL` 后会与其组合 |
| `method` | `GET \| POST \| PUT \| DELETE` | 是 | 请求方法，统一使用大写 |
| `params` | `TRequestParams` | 否 | 统一请求入参；根据 Method 转为 Query 或 Body |
| `headers` | `Record<string, string>` | 否 | 本次请求额外携带的请求头 |
| `timeout` | `number` | 否 | 本次请求超时时间，优先于初始化配置 |
| `showErrorMessage` | `boolean` | 否 | 本次是否展示统一错误提示，优先于初始化配置 |
| `skipAuth` | `boolean` | 否 | 为 `true` 时跳过 Token 获取与注入 |
| `responseType` | `json \| blob \| text` | 否 | 响应数据类型，默认按 JSON 处理 |
| `signal` | `AbortSignal` | 否 | 使用标准 AbortController 取消请求 |
| `withCredentials` | `boolean` | 否 | 是否携带跨域 Cookie 等凭证 |

当前公开的单次请求配置不包含 `data`、`paramsSerializer` 或 `onUploadProgress`，也暂不支持
`PATCH`。自定义 `validateStatus` 属于实例初始化配置。出现通用需求时应由 gz-pc 统一扩展，
不在业务项目中绕过类型限制。

## 统一处理 HTTP 401

micro-app 模板默认开启 401 处理。请求收到 401 后不会再展示普通错误 message，而是通过
全局共享管理器只打开一个登录失效 Modal；即使多个请求或多个 gzFetch 实例同时收到 401，
也不会重复弹窗或重复执行登录动作。

默认文案和跳转地址为：

```ts
unauthorized: {
  enabled: false,
  loginUrl: '/login',
  modalTitle: '登录失效',
  modalMessage: '当前登录状态已失效，请重新登录。',
}
```

这里的 `enabled: false` 是库默认值；模板通过初始化配置将它改为 `true`。如需覆盖登录地址
或文案，在 `src/bootstrap/configure-request.ts` 修改：

```ts
configureGzFetch({
  unauthorized: {
    enabled: true,
    loginUrl: '/sso/login',
    modalTitle: '登录状态已过期',
    modalMessage: '请重新登录后继续使用。',
  },
});
```

特殊项目可提供 `onUnauthorized: () => void` 处理 SSO、退出登录、业务状态清理或主应用跳转。
传入回调后优先执行回调，不再执行 `loginUrl` 默认跳转。Garfish 子应用如果由主应用负责登录，
应按照主应用契约提供该回调，不能假设子应用的 `/login` 一定是正确路由。

## Token 与公开接口

默认请求通过初始化时的 `getToken` 自动携带 Token，业务接口不手动读取或拼接 Token。

如果接口明确不需要登录态，使用：

```ts
gzFetch({
  url: '/public/config',
  method: 'GET',
  skipAuth: true,
});
```

不要通过传入空 Token 模拟公开请求，也不要把 Token 写入环境变量、Mock 数据或业务代码。

默认 Header 名称和 Token 格式也可以在初始化时统一修改：

```ts
configureGzFetch({
  getToken: () => useGlobalStore.getState().token ?? undefined,
  auth: {
    headerName: 'X-Token',
    formatToken: (token) => `Token ${token}`,
  },
});
```

## 覆盖默认配置

个别接口可以通过请求配置覆盖实例默认值：

```ts
await gzFetch<void, { name: string }>({
  url: '/save',
  method: 'POST',
  params: { name: 'Alice' },
  timeout: 10_000,
  showErrorMessage: false,
});
```

`showErrorMessage: false` 适用于页面需要自行处理错误的场景，可以避免统一提示与页面提示重复出现。

更多单次请求配置、错误处理、中间件和独立实例说明见 [gz-pc 请求文档](/gz-pc/fetch)。
