---
title: 常见问题
order: 1
toc: content
---

这里集中整理使用 gg-cli 创建项目后，在开发、构建和部署阶段最常见的问题。

## 创建项目

### 找不到 `gg-cli` 命令

先确认全局安装成功，并重新打开终端：

```bash
npm install -g @chenhui996/gg-cli
gg-cli --version
```

同时确认 Node.js 版本不低于 `22.19.0`，以及 npm 全局可执行目录已加入系统 PATH。

### 模板下载失败

检查当前账号是否有模板仓库读取权限、Git 凭据是否有效，以及当前网络或代理能否访问模板仓库。不要把个人 Token 写进命令、项目文件或截图。

### 创建出来的项目不是最新模板

需要主动拉取最新模板时执行：

```bash
gg-cli init demo-app --refresh
```

gg-cli 文档不会跟随模板的每次小改动自动同步；如果出现大版本差异，以已发布模板和维护说明为准。

## 本地开发

### `dev` 和 `mock` 有什么区别？

- `npm run dev`：连接当前 development 配置中的真实接口。
- `npm run mock`：启动 MSW，由本地声明为已匹配请求返回模拟数据。

两者都只用于本地开发，不生成部署产物。详细说明见[命令行](/getting-started/commands)。

### 修改 `.env.*` 后为什么没有生效？

先确认当前命令读取的是对应 mode 的环境文件。例如 `build:sit` 对应 `.env.sit`。修改后要重启本地开发服务，或重新执行构建并重新发布 `dist`。

只有以 `VITE_` 开头的变量才会暴露给 Vite 客户端代码。不要把 Token、密码或其他密钥放进前端环境变量。

### Mock 模式下为什么仍有请求发往后端？

模板允许未匹配的请求继续访问真实接口。检查 Mock Key 的路径与 method 是否匹配，路径不要包含 Host、API baseURL 或 Query。更多规则见 [gz-pc 与声明式 Mock](/gz-pc/mock)。

### 业务接口应该直接使用 Axios 吗？

新业务代码优先使用 gz-pc 提供的统一请求能力，避免每个项目重复处理 baseURL、错误提示和中间件。查看 [gz-pc 请求能力](/gz-pc/fetch)。

## 请求反馈与 401

### 升级 gz-pc 后为什么没有登录失效弹窗？

库默认不处理 401。检查应用初始化中的 `unauthorized.enabled: true` 和主题根节点中的
`GzFetchFeedbackProvider` 是否都已接入；同时确认实际使用的客户端没有被后续初始化覆盖。
完整接入见[请求反馈与 401](/gz-pc/feedback)。

### 为什么打开弹窗后还有错误 message？

开启统一 401 后，gzFetch 会抑制该请求的普通 message。检查页面 catch、
`useRequest.onError` 或错误中间件是否重复调用 `message.error`。401 仍会 reject，
业务层可以更新状态，但不需要再次展示同一错误。

### 配置了 showErrorMessage: false，为什么 401 仍然弹窗？

该选项仅控制普通错误 message，401 由初始化配置的 `unauthorized.enabled` 独立控制。
`skipAuth` 也只负责跳过 Token 注入，不是关闭 401 的开关。

### 如何模拟 401？为什么 Network 没看到请求？

使用 `npm run mock`，将声明式 Mock 的 HTTP `status` 设置为 `401` 并注册模块。
只在响应 JSON 中写 `code: 401` 不会生效。若测试按钮使用 `manual: true`，需要点击后才发出请求。
可复制的 API、Mock 和按钮示例见[本地验证说明](/gz-pc/feedback)。

### 旧 Modal 能跟随主题，还需要换 Provider 吗？

推荐迁移到 `GzFetchFeedbackProvider`，它统一管理普通 message 与 401 Modal。
旧 `GzFetchUnauthorizedModal` 保留兼容，但不负责普通消息的上下文注册；
静态 message 的颜色变化不等同于继承 React 主题上下文。

## 构建与内网部署

### 内网开发环境和 SIT 环境分别用哪个命令？

| 目标环境 | 命令 | 构建后发布 |
| --- | --- | --- |
| 内网开发环境 | `npm run build:dev` | `dist/` |
| 内网 SIT / 集成测试环境 | `npm run build:sit` | `dist/` |
| 生产环境 | `npm run build` | `dist/` |

不要把 `npm run dev` 的本地开发服务器当作内网部署服务。完整映射见[部署](/getting-started/deployment)。

### 部署后请求到了错误的后端

优先检查本次构建所用 `.env.*` 中的 `VITE_API_BASE_URL`，然后确认流水线实际执行的构建命令。前端地址已经写入静态资源时，修改服务器环境变量不会自动改变旧的 `dist`，必须重新构建。

### `VITE_API_SERVER` 是接口地址吗？

不是。`VITE_API_BASE_URL` 才是后端 API 的基础地址或前缀；`VITE_API_SERVER` 表示前端部署完成后的完整访问地址，可供运行配置或 Garfish 主应用加载使用。

### 部署后首页能打开，刷新子路由却 404

确认 Nginx 或静态资源服务已配置 SPA 路由回退，让未知页面路径回到 `index.html`。如果部署在二级目录，还要同步检查 Vite 的 `base`、React Router basename 和 Garfish 激活路径。

### 发布后仍看到旧页面

确认上传的是本次构建生成的完整 `dist`，而不是在旧目录上漏传部分文件。HTML 建议使用较短缓存，带内容哈希的 JS/CSS 可使用长期缓存；发布后同时检查 CDN、网关和浏览器缓存。

### 构建产物过大怎么办？

执行：

```bash
npm run analyze
```

查看大依赖、重复依赖和不必要的整包引入。该命令用于诊断，不替代 `build:dev`、`build:sit` 或正式构建任务。
