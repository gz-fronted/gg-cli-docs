---
title: 开发提示
order: 3
---

# 开发提示

这份清单面向日常业务开发。具体规则以生成项目中的 `docs/agent-references` 和现有代码为准。

## 开始一个需求

1. 先找到对应的 `src/pages` 页面和路由配置。
2. 查看同一业务模块已有的组件、接口和状态写法，保持一致。
3. 确认本次使用真实接口还是 Mock，选择 `dev` 或 `mock`。
4. 小步完成页面、接口和异常状态，不顺手改造无关基础设施。

## 页面与组件

- 优先从 gg-ui 引入组件；gg-ui 没有时再使用 Ant Design。
- 页面只负责组合业务能力，可复用的交互拆到 `src/components`。
- 保留加载中、空数据、接口失败和无权限状态，不只实现成功场景。
- 不在页面里写固定接口地址、Token 或环境判断。
- 样式沿用项目主题变量，避免覆盖全局标签或使用难以追踪的高权重选择器。

查看 [gg-ui 使用入口](/gg-ui)。

## 接口与数据

- 接口函数按业务领域放进 `src/api`，页面不要直接调用 Axios。
- 使用 gz-pc 的 `gzFetch`，为请求参数和响应数据声明 TypeScript 类型。
- 通用 Token、baseURL 和错误提示由应用入口统一配置，业务模块不要重复初始化。
- 后端协议不明确时先确认，不在前端请求层猜测或静默兼容多套格式。

```ts
import { gzFetch } from '@gz-fronted/gz-pc/fetch';

export const getUser = (params: { id: string }) =>
  gzFetch<{ id: string; name: string }, { id: string }>({
    url: '/user/detail',
    method: 'GET',
    params,
  });
```

查看 [gz-pc 请求说明](/gz-pc/fetch)。

## Mock

- Mock 文件放在模板约定的 `mock/` 目录，不把假数据写进生产组件。
- Mock Key 只写 pathname 和小写 method，不包含 Host、API 前缀或 Query。
- Mock 数据不能包含真实手机号、证件号、账号或 Token。
- 联调前切回 `npm run dev`，至少验证一次真实接口。

查看 [声明式 Mock](/gz-pc/mock)。

## 状态与 Hooks

- 组件内部状态优先使用 React state。
- 确实需要跨页面共享时才放入 Zustand store。
- 通用 Hooks 从 `@gz-fronted/gz-pc/hooks` 导入，避免各项目形成不同入口。
- 日期和 Query 转换优先复用 gz-pc utils，不重复编写工具函数。

## 构建与发布

- 本地开发：`npm run dev` 或 `npm run mock`。
- 内网开发环境：`npm run build:dev`。
- 内网 SIT 环境：`npm run build:sit`。
- 正式环境：`npm run build`。
- 只发布本次构建生成的完整 `dist/`。

构建命令决定读取哪套 `.env.*`，发布前重点确认 API 地址和前端访问地址。查看[项目命令](/commands)。

## 提交前自检

- TypeScript 没有新增错误，项目已有检查命令可以通过。
- 页面覆盖加载、空数据、失败等必要状态。
- 新接口集中在 `src/api`，没有散落的请求和固定环境地址。
- 新组件遵循 gg-ui 和项目现有视觉规范。
- 没有提交密钥、真实业务数据或仅用于个人调试的代码。
- 修改公共组件、路由或微应用入口时，已检查受影响页面。
