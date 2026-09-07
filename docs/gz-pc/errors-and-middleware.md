---
title: 响应、错误与中间件
order: 3
toc: content
---

# 响应、错误与中间件

## 响应约定

当前请求核心默认把所有 HTTP `2xx` 状态视为成功，成功时直接返回后端原始 `response.data`。

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

普通错误默认由 `GzFetchFeedbackProvider` 通过 gg-ui message 展示。Provider 应挂在 gg-ui
`ConfigProvider` 内，因此 message 会跟随当前主题；业务层不要再次提示同一个错误。

如果页面需要自己显示错误，请关闭单次统一提示，避免重复提示：

```ts
await gzFetch<void, SaveParams>({
  url: '/save',
  method: 'POST',
  params,
  showErrorMessage: false,
});
```

## HTTP 401

初始化时显式配置 `unauthorized.enabled: true` 后，HTTP 401 的优先级高于普通错误 message：

1. 响应错误转换为 `GzFetchError`。
2. 401 进入全局共享的无权限管理器，不展示普通 message。
3. 根节点 `GzFetchFeedbackProvider` 在当前主题上下文内展示 Modal。
4. 用户确认后优先执行 `onUnauthorized`，否则跳转 `loginUrl`。
5. Modal 完成关闭后释放全局状态。

多个并发请求或多个 gzFetch 实例只会出现一个 Modal，登录动作也只会执行一次。401 仍会继续
经过错误中间件并向调用方抛出，业务代码可以更新自身 loading 状态，但不要重复显示错误。

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
