---
title: 请求与初始化
order: 2
toc: content
---

# gzFetch

## 初始化默认实例

应用启动阶段统一配置一次：

```ts
import { configureGzFetch } from '@gz-fronted/gz-pc/fetch';
import { useGlobalStore } from '@/store/useGlobalStore';

configureGzFetch({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  getToken: () => useGlobalStore.getState().token ?? undefined,
  showErrorMessage: true,
});
```

Garfish 重新挂载时可以覆盖上次配置。普通业务模块不应重复调用初始化，也不应自行创建请求实例。

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

普通业务模块不要为每个领域创建一个请求实例。
