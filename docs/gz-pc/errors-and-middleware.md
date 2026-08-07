---
title: 响应、错误与中间件
order: 3
toc: content
---

# 响应、错误与中间件

## 响应约定

当前请求核心只有 HTTP Status `200` 视为成功，成功时直接返回后端原始 `response.data`。

它不会：

- 返回 `AxiosResponse`。
- 判断业务 `code`。
- 自动解包 `data`。
- 转换分页、字段、日期或其他服务端数据。

业务响应体的解析应在 API 层显式实现。

## 错误类型

```text
HTTP_ERROR
NETWORK_ERROR
TIMEOUT_ERROR
CANCELED_ERROR
UNKNOWN_ERROR
```

HTTP 错误优先读取响应体中的 `msg`。没有有效 `msg` 时使用默认错误文案，最终抛出 `GzFetchError`。

如果页面需要自己显示错误，请关闭单次统一提示，避免重复提示：

```ts
await gzFetch<void, SaveParams>({
  url: '/save',
  method: 'POST',
  params,
  showErrorMessage: false,
});
```

## 取消请求

```ts
const controller = new AbortController();

const promise = gzFetch<UserDetail>({
  url: '/user/detail',
  method: 'GET',
  signal: controller.signal,
});

controller.abort();
await promise;
```

取消会转换为 `CANCELED_ERROR`，默认不显示错误消息。

## 中间件

请求、响应和错误中间件按注册顺序执行：

```ts
configureGzFetch({
  middlewares: [
    {
      onRequest(config) {
        return {
          ...config,
          headers: {
            ...config.headers,
            'X-Trace-ID': crypto.randomUUID(),
          },
        };
      },
      onResponse(data, context) {
        console.debug(context.status);
        return data;
      },
      onError(error) {
        console.error(error.type);
      },
    },
  ],
});
```

中间件应处理真正跨业务的逻辑，不要用它偷偷改变单个接口的数据结构。
