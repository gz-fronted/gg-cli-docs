---
title: 请求反馈与 401
order: 2.5
toc: content
---

# 请求反馈与 HTTP 401

`GzFetchFeedbackProvider` 统一承载 gzFetch 的普通错误 message 和登录失效 Modal。
`unauthorized` 配置决定是否开启 401 处理，以及用户确认后如何登录。

使用这项能力需要安装包含上述 API 的 gz-pc 版本。本次功能对应 `0.1.1`；
此前测试版本 `0.1.1-beta.4` 也提供了这两个入口。仅升级依赖不会自动开启 401 处理。

## 新模板与已有项目

| 项目状态 | 需要做什么 |
| --- | --- |
| 使用已集成本功能的 micro-app 模板 | 初始化配置和 Provider 均已内置，只需核对登录地址 |
| 已有项目只升级了 gz-pc | 在初始化层开启 `unauthorized.enabled`，在根主题节点挂载 Provider |
| 已挂载 `GzFetchUnauthorizedModal` | 改用 `GzFetchFeedbackProvider` 包裹原有子节点，移除单独挂载的旧 Modal |

先检查 `src/bootstrap/configure-request.ts` 和 `src/components/AppThemeProvider/index.tsx`，
不要仅凭项目创建时间判断是否已经接入。

## 完整接入

### 1. 应用启动时配置请求

在已有的 `configureRequest` 中添加 `unauthorized`，并在页面请求发出前调用一次：

```ts
import { configureGzFetch } from '@gz-fronted/gz-pc/fetch';
import { useGlobalStore } from '@/store/useGlobalStore';

export const configureRequest = (): void => {
  configureGzFetch({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
    getToken: () => useGlobalStore.getState().token ?? undefined,
    showErrorMessage: true,
    unauthorized: {
      enabled: true,
      loginUrl: '/login',
    },
  });
};
```

`configureGzFetch` 每次调用都会创建并替换默认客户端，**不是增量合并配置**。
修改时保留原有的 `baseURL`、`getToken`、中间件等配置，不要在页面里另调用一次仅包含
`unauthorized` 的初始化。特殊的独立客户端需要在各自的 `createGzFetch` 配置中开启。

### 2. 在当前主题上下文内挂载 Provider

下面展示根主题组件的结构；已有项目将 Provider 放入自己的 `ConfigProvider` 即可，
保留原有 `prefixCls`、`cssVarScope`、语言和其他主题配置。

```tsx | pure
import { ConfigProvider, type GZThemeMode } from '@chenhui996/gg-ui';
import { GzFetchFeedbackProvider } from '@gz-fronted/gz-pc/fetch';
import type { FC, ReactNode } from 'react';

interface AppThemeProviderProps {
  themeMode: GZThemeMode;
  children: ReactNode;
}

const AppThemeProvider: FC<AppThemeProviderProps> = (props) => {
  const { themeMode, children } = props;

  return (
    <ConfigProvider themeMode={themeMode}>
      <GzFetchFeedbackProvider>{children}</GzFetchFeedbackProvider>
    </ConfigProvider>
  );
};

export default AppThemeProvider;
```

业务页面继续调用 `gzFetch({ url, method, params })`，不需要挂载 Modal、复制拦截器或维护
弹窗可见状态。Provider 本身不会启用 401，仍需第一步的显式配置。

## unauthorized 配置

类型从 `@gz-fronted/gz-pc/fetch` 导出为 `GzFetchUnauthorizedOptions`，
用于 `configureGzFetch` / `createGzFetch`，不属于单次请求配置。

| 字段 | 类型 | 库默认值 | 行为 |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | 仅显式开启时处理 HTTP 401 |
| `loginUrl` | `string` | `'/login'` | 用户确认后默认导航的地址 |
| `modalTitle` | `string` | `'登录失效'` | 弹窗标题 |
| `modalMessage` | `string` | `'当前登录状态已失效，请重新登录。'` | 弹窗正文 |
| `onUnauthorized` | `() => void` | 未设置 | 用户确认后调用；提供时替代默认导航 |

标题和正文由配置控制，不会自动使用接口响应体中的 `msg`。
按钮当前为“重新登录”和“取消”，没有额外的按钮文案配置项。

### 登录地址与 SSO

默认使用 `window.location.assign(loginUrl)`，是浏览器页面导航，不是 React Router 内部跳转。
`/login` 指向当前页面 origin 下的路径，不自动拼接 API baseURL、Vite base 或路由 basename；
gz-pc 不会创建登录页。

只需改变地址时，修改原初始化对象中的 `unauthorized.loginUrl`。需要清理状态、调用宿主登录
能力或执行特殊退出逻辑时，提供 `onUnauthorized`：

```ts
import type { GzFetchUnauthorizedOptions } from '@gz-fronted/gz-pc/fetch';

export const createSsoUnauthorizedOptions = (
  clearSession: () => void,
  redirectToLogin: () => void,
): GzFetchUnauthorizedOptions => ({
  enabled: true,
  modalTitle: '登录状态已过期',
  modalMessage: '请重新登录后继续使用。',
  onUnauthorized: () => {
    clearSession();
    redirectToLogin();
  },
});
```

将返回值赋给原有初始化配置的 `unauthorized`；两个函数由业务按已有登录契约提供。
回调在**用户确认时**执行，不是每次收到 401 时执行。传入回调后不会再执行 `loginUrl`，
也不会在回调失败时自动回退到默认导航。

当前回调契约为 `() => void`，组件不会等待异步任务完成；如果退出登录是异步操作，
业务回调需自行安排后续跳转和异常处理。

Garfish 子应用应先确认登录由谁负责：由主应用统一处理时，使用主应用约定的回调；
独立运行时使用有效的独立登录地址。不要把测试项目跳转到不存在的 `/login` 所产生的 404
误认为 401 弹窗失败。

## 错误提示的优先级

以下行为基于 HTTP 状态判定失败、已正确挂载 Provider 的请求：

| 场景 | 普通 message | 401 Modal | 请求 Promise |
| --- | --- | --- | --- |
| HTTP 2xx | 不显示 | 不显示 | 返回原始响应体 |
| 普通 HTTP 错误、网络异常、超时 | 按 `showErrorMessage` 展示 | 不显示 | reject |
| HTTP 401，未开启 unauthorized | 按 `showErrorMessage` 展示 | 不显示 | reject |
| HTTP 401，已开启 unauthorized | 不显示 | 显示，共享去重 | reject |
| HTTP 401，已开启且 `showErrorMessage: false` | 不显示 | 仍然显示 | reject |
| 请求取消 | 不显示 | 不显示 | reject，类型为 `CANCELED_ERROR` |

`showErrorMessage` 只控制普通 message；单次请求配置优先于实例配置。
`skipAuth` 只跳过 Token 获取和注入，也不会关闭 401 处理。

401 仍经过错误中间件并抛出 `GzFetchError`。页面和 `useRequest.onError` 可以处理局部状态，
但不要再次对同一个错误调用 `message.error`。库无法阻止业务自己创建的提示。

## 为什么能跟随主题

Provider 使用 gg-ui 的 `message.useMessage()`，将其 `contextHolder` 和受控 Modal
放在业务的 `ConfigProvider` 内。请求层只分发反馈，渲染由这棵 React 树负责；
当前主题变化时，消息和弹窗沿用 gg-ui 的主题能力，不需要额外的亮色/暗色 CSS。

未挂载反馈 Provider 时，普通错误会兼容回退到静态 `message.error`。有些项目的全局
CSS 变量恰好也能让静态消息跟随颜色，但这不代表它继承了局部 React 上下文。

如果开启 401 却没有挂载 Provider 或旧 Modal，库会记录待展示状态并抑制普通 401 message，
但页面没有弹窗渲染节点。应在应用启动时完成根节点接入。

旧 `GzFetchUnauthorizedModal` 仍保留兼容导出，并标记为 deprecated；它只承载 401 Modal，
不注册普通消息实例。迁移后统一使用 `GzFetchFeedbackProvider`。

## 并发、关闭与共享范围

首个 401 保存本次弹窗配置，状态从空闲变为打开。打开和关闭动画期间，其他 401
不会创建新弹窗，也不会覆盖首个请求的标题、回调或登录地址。确认后本轮登录动作最多执行一次；
取消或关闭不执行登录动作。关闭动画完成后恢复空闲，后续独立的 401 可以再次打开。

共享状态是 **同一份 gz-pc 模块中的状态**，因此同一应用里默认客户端和多个
`createGzFetch` 客户端能够去重。它不保证多个浏览器标签页、iframe，或各自打包独立
gz-pc 副本的主子应用之间也共享一个弹窗；这类场景需要宿主统一协调，不能依赖模块单例。

## 本地验证弹窗

下面是在 micro-app 模板内添加临时测试入口的完整步骤，不需要真实后端。

### 1. 声明并注册 HTTP 401 Mock

新增 `mock/unauthorized.ts`：

```ts
import { defineMock } from '@/mock/runtime';

export default defineMock({
  '/example/unauthorized.get': {
    status: 401,
    mockTime: 300,
    res: { msg: '用于验证登录失效弹窗的测试响应' },
  },
});
```

在 `mock/index.ts` 中导入该模块并追加到原有导出数组，保留已注册的其他 Mock。
这里设置的是 HTTP `status: 401`；仅在 `res` 里写 `code: 401`、HTTP 仍为 200 时不会触发。

### 2. API 仍使用 gzFetch

新增 `src/api/unauthorized-test.ts`：

```ts
import { gzFetch } from '@gz-fronted/gz-pc/fetch';

export const requestUnauthorized = (): Promise<void> =>
  gzFetch<void>({
    url: '/example/unauthorized',
    method: 'GET',
  });
```

### 3. 按钮手动发起请求

把以下临时组件挂到需要调试的页面中：

```tsx | pure
import { Button } from '@chenhui996/gg-ui';
import { useRequest } from '@gz-fronted/gz-pc/hooks';
import type { FC } from 'react';
import { requestUnauthorized } from '@/api/unauthorized-test';

const UnauthorizedTestButton: FC = () => {
  const { loading, run } = useRequest(requestUnauthorized, {
    manual: true,
    // 反馈由 gzFetch 展示，此处无需重复 toast。
    onError: () => undefined,
  });

  return (
    <Button loading={loading} onClick={() => run()}>
      触发 401 弹窗
    </Button>
  );
};

export default UnauthorizedTestButton;
```

执行 `npm run mock`，在开发地址加 `?themeSwitcher=1`，点击按钮后查看 Network 中
`/api/example/unauthorized` 的状态。因为使用了 `manual: true`，单纯刷新页面不会发出请求。
`npm run dev` 不启用上述 Mock。

先切换亮色、暗色分别触发；取消并等弹窗关闭后，再次点击应能重新打开。确认会按配置跳转；
只检查样式时可取消。需要验证并发时，可在临时点击处理函数中发起：

```ts
await Promise.allSettled(
  Array.from({ length: 5 }, () => requestUnauthorized()),
);
```

预期 Network 出现 5 个 401，只显示 1 个 Modal，且没有额外的普通错误 message。

## 排查顺序

1. **没有请求**：确认进入的是测试页面并点击按钮；检查是否使用了 `manual: true`。
2. **返回了 200**：确认是 Mock 的 HTTP `status`，而不是响应 JSON 的业务 `code`。
3. **只显示 message**：检查安装版本、初始化顺序、实际使用的客户端是否开启 unauthorized，
   以及后续是否又调用 `configureGzFetch` 覆盖了配置。
4. **401 没有任何反馈**：检查根 Provider 是否挂载；自定义 `validateStatus` 不能把 401 判为成功。
5. **Modal 和 message 同时出现**：检查页面 catch、`useRequest.onError` 和错误中间件是否重复 toast。
6. **颜色不跟随**：确认 Provider 位于当前 gg-ui `ConfigProvider` 内，二者使用同一份 gg-ui；
   多份组件库副本可能使 Context 不一致。
7. **确认后跳错地址**：核对 `loginUrl`、路由前缀和 `onUnauthorized` 的优先级。
