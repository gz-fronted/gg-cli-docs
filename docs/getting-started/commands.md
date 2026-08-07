---
title: 命令行
order: 6
toc: content
---

# 命令行

这里说明的是 gg-cli 生成项目中 `package.json` 的常用 scripts。

## 常用命令

| 命令 | 用途 | 生成 `dist` |
| --- | --- | --- |
| `npm run dev` | 本地开发，连接真实接口 | 否 |
| `npm run mock` | 本地开发，使用 Mock 数据 | 否 |
| `npm run build:dev` | 构建内网开发环境版本 | 是 |
| `npm run build:sit` | 构建 SIT / 集成测试环境版本 | 是 |
| `npm run build` | 正式生产构建 | 是 |
| `npm run preview` | 本地预览已经生成的构建产物 | 否 |
| `npm run analyze` | 生产构建并分析依赖体积 | 是 |
| `npm run lint` | 使用 ESLint 检查项目代码 | 否 |

<div class="gz-callout">
  <strong>注意：</strong><code>dev</code> 和 <code>mock</code> 不能用于服务器部署。内网流水线需要根据目标环境选择对应构建命令，并发布完整的 <code>dist/</code>。
</div>

## 预览构建产物

`preview` 不会执行构建，需要先生成 `dist/`：

```bash
npm run build
npm run preview
```

它通过 Vite Preview 在本机运行当前构建产物，适合发布前检查页面、静态资源和路由。它仍然是本地预览服务，不能作为正式服务器部署方式。

## 代码检查

```bash
npm run lint
```

该命令使用 ESLint 检查整个项目，适合在提交或发起合并请求前执行。它不会生成构建产物，也不会自动修复全部问题；检查失败时应根据终端提示修改代码后重新执行。

`micro-app` 还提供 `typecheck`、`lint:style` 和 `format:check` 等专项检查。具体可用命令始终以当前项目的 `package.json` 为准。

## 模板差异

上表以 `micro-app` 为准。`main-app` 当前提供的 scripts 可能不同，执行前以项目自己的 `package.json` 为准。

如果需要指定包管理器、代理或强制刷新模板，查看 [gg-cli 参数](/cli/commands)。
