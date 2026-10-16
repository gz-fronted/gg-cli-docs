---
title: CLI 概览
order: 1
toc: content
---

# gz-cli

`gz-cli-front` 是团队前端项目初始化工具，主命令为 `gz-cli`，同时保留 `gz-cli-front` 兼容入口。

```bash
npm install -g gz-cli-front
gz-cli --version
```

不全局安装时使用 `npx gz-cli-front init my-app`。

## 从旧包迁移

```bash
npm uninstall -g @chenhui996/gg-cli
npm install -g gz-cli-front
gz-cli init my-app
```

新包不注册 `gg-cli` 命令。已有项目不会随 CLI 或模板更新自动迁移。

新包使用 `~/.gz-cli-front/cache` 缓存模板，可通过 `GZ_CLI_FRONT_CACHE_DIR` 指定目录，
通过 `GZ_CLI_FRONT_DEBUG=1` 开启调试日志；不读取旧的 `GG_CLI_*` 环境变量。

## 常用方式

```bash
gz-cli init my-app
```

指定包管理器：

```bash
gz-cli init my-app --pm npm
```

强制获取最新模板：

```bash
gz-cli init my-app --refresh
```

内网无法访问 GitHub 时，使用内置微应用模板：

```bash
gz-cli init my-app --internal
```

支持简写 `-i`；模板随 CLI 版本更新，依赖安装仍需可用的 npm 源。

更多参数见[命令行参数](/cli/commands)。网络或权限异常见[常见问题](/cli/troubleshooting)。
