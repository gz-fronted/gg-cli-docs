---
title: 项目命令
order: 1
---

# 项目命令

这里说明的是 **gg-cli 生成项目中 `package.json` 的 scripts**，用于日常开发、构建和部署；不是 `gg-cli init` 自身的参数。

以下内容以 `micro-app` 模板为基准。执行前先进入项目目录并完成依赖安装。

<div class="gz-callout">
  <strong>新人先记住：</strong><code>dev</code> 和 <code>mock</code> 用于本地开发；<code>build:dev</code>、<code>build:sit</code> 和 <code>build</code> 才生成可部署的 <code>dist</code>。
</div>

## 常用命令速查

| 命令 | 用途 | 使用场景 | 是否生成 `dist` |
| --- | --- | --- | --- |
| `npm run dev` | 启动 Vite 开发服务，读取 development 模式配置 | 本地开发、连接真实接口 | 否 |
| `npm run mock` | 启动本地 Mock 服务 | 后端接口未就绪、独立开发页面 | 否 |
| `npm run build:dev` | 按 development 模式构建 | 部署到内网开发环境 | 是 |
| `npm run build:sit` | 按 sit 模式构建 | 部署到内网 SIT / 集成测试环境 | 是 |
| `npm run build` | 执行生产构建 | 正式环境发布 | 是 |
| `npm run analyze` | 执行生产构建并生成依赖体积分析 | 排查包体积、优化首屏加载 | 是 |

## 开发与 Mock

### `npm run dev`

启动本地开发服务器，适合日常编码和接口联调。该命令不会生成可部署文件，也不应作为服务器启动命令使用。

```bash
npm run dev
```

默认读取 development 模式对应的环境变量。接口请求会连接配置的真实后端。

### `npm run mock`

启动本地 Mock 模式，业务代码仍正常调用 gz-pc 请求能力，只是已声明的接口由 MSW 返回模拟数据。

```bash
npm run mock
```

适合后端接口尚未完成或需要复现固定数据场景时使用。它只服务于本地开发，不参与内网部署；未匹配的请求可以继续访问真实接口。

## 构建与环境映射

内网发布时，构建命令决定 Vite 读取哪一套环境配置。部署平台应明确指定命令，不要让不同环境共用一个含糊的默认构建任务。

| 目标环境 | 构建命令 | Vite mode | 主要环境文件 | 部署产物 |
| --- | --- | --- | --- | --- |
| 内网开发环境 | `npm run build:dev` | `development` | `.env.development` | `dist/` |
| 内网 SIT / 集成测试环境 | `npm run build:sit` | `sit` | `.env.sit` | `dist/` |
| 生产环境 | `npm run build` | `production` | `.env.production` | `dist/` |

推荐内网流水线按环境拆成独立任务：

```text
开发环境  → npm run build:dev → 发布 dist
SIT 环境 → npm run build:sit → 发布 dist
生产环境  → npm run build     → 发布 dist
```

构建前应确认对应环境文件中的地址与当前目标环境一致：

- `VITE_API_BASE_URL`：后端接口的基础地址或统一前缀，决定浏览器请求发往哪里。
- `VITE_API_SERVER`：前端部署完成后的完整访问地址，常用于应用运行或主应用加载配置；它不是后端 API 地址，也不是开发代理目标。

环境变量会在构建阶段写入静态资源。修改 `.env.*` 后，需要重新执行对应构建并重新发布 `dist`，仅重启 Nginx 不会更新已生成的地址。

## 构建分析

```bash
npm run analyze
```

该命令按生产模式构建，同时开启依赖体积分析。它用于定位大依赖、重复依赖和异常包体积，不是常规环境部署命令。分析文件的具体名称和位置以当前模板配置为准，通常会随构建结果输出在 `dist` 中。

## 模板差异

上表以 `micro-app` 为准。当前 `main-app` 模板提供 `dev`、`build:test`、`build:prod`、`build` 和 `analyze`，不一定包含 `mock`、`build:dev`、`build:sit`。使用主应用时先查看该项目的 `package.json`，由部署流水线选择模板实际存在的脚本。

如果项目经过二次改造，始终以项目当前 `package.json` 和 `.env.*` 为最终依据。

## gg-cli 自身命令

安装脚手架、创建项目或刷新模板，请查看 [快速开始](/getting-started) 和 [gg-cli 命令行参数](/cli/commands)。
