---
title: Mock
order: 5
toc: content
---

# Mock

`micro-app` 模板使用 MSW 提供本地 Mock。业务代码仍然调用真实的接口函数，Mock 模式只改变响应来源。

<div class="gz-callout">
  <strong>先看项目内文档：</strong>gg-cli 生成的项目已经提供 <code>docs/agent-references/mock.md</code>，其中记录了当前模板准确的 Mock Key、响应配置、数据生成和模块注册方式。普通业务 Mock 以该文件为准。
</div>

## 模板已经提供什么

```text
.env.mock                         Mock 模式环境变量
src/mock/                         MSW 与声明式 Mock Runtime
docs/agent-references/mock.md     业务 Mock 开发规范
docs/agent-references/mock-runtime.md  Runtime 维护规范
mock/                             业务接口声明与数据
```

普通业务开发只需要阅读 `mock.md` 并维护根目录 `mock/`。只有修改 `src/mock/` 底层 Runtime、MSW 集成或 Runtime 测试时，才阅读 `mock-runtime.md`。

## 启动 Mock

```bash
npm run mock
```

## 声明接口

在模板约定的 `mock/` 目录中添加声明：

```ts
import { defineMock } from '@/mock/runtime';

export default defineMock({
  '/example/ping.get': {
    res: { message: 'pong' },
  },
});
```

Mock Key 使用 `/pathname.method` 格式。路径不包含 Host、API 前缀或 Query，Method 使用小写。

新增模块后还要在 `mock/index.ts` 中完成注册。固定响应默认使用 `status: 200` 和 `mockTime: 500`，需要无延迟时可以显式设置 `mockTime: 0`。

## 使用边界

- 不把临时假数据写进页面组件。
- Mock 数据不能包含真实账号、手机号、Token 或业务数据。
- 未匹配请求可能继续访问真实接口。
- 联调和提交前切回 `npm run dev`，至少验证一次真实接口。

本站只提供新人入口。完整格式、Resolver、Store、错误响应和数据生成规则以项目中的 `docs/agent-references/mock.md` 为准；通用能力概览见 [gz-pc 与声明式 Mock](/gz-pc/mock)。
