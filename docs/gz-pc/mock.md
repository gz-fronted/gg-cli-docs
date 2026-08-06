---
title: 与声明式 Mock 配合
order: 5
---

# gz-pc 与声明式 Mock

micro-app 模板使用 MSW 实现声明式 Mock。业务代码始终调用 gzFetch，Mock 模式只改变响应来源。

## 启动方式

| 命令 | Mock |
| --- | --- |
| `npm run dev` | 不启用，访问真实接口 |
| `npm run mock` | 启用 |
| `npm run build:sit` | 不启用 |
| `npm run build:prod` | 不启用 |

## 声明一个接口

```ts
import { defineMock } from '@/mock/runtime';

export default defineMock({
  '/example/ping.get': {
    res: {
      message: 'pong',
    },
  },
});
```

Mock Key 格式：

```text
/pathname.method
```

- 路径以 `/` 开头。
- Method 使用小写 `get`、`post`、`put`、`delete`。
- Key 不包含 Host、API baseURL 或 Query。
- 动态参数使用 `/user/:id.get`。

默认 `status` 为 `200`，默认 `mockTime` 为 `500` 毫秒。

## 开发边界

- 业务 Mock 不直接导入 MSW Worker、Handler 或 HttpResponse。
- Mock Runtime 与 Zustand 无关，不持久化到 localStorage。
- 未匹配请求在本地 Mock 模式可以继续访问真实接口。
- 不在 Mock 数据中使用真实手机号、证件号、Token 或账号。
