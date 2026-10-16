---
title: 命令行参数
order: 2
toc: content
---

# 命令行参数

## init

```bash
gz-cli init [project-name] [options]
```

| 参数 | 说明 | 示例 |
| --- | --- | --- |
| `[project-name]` | 可选项目名；未提供时交互输入 | `gz-cli init order-center` |
| `--pm <package-manager>` | 指定 npm、pnpm 或 yarn | `--pm npm` |
| `--proxy <url>` | 为本次初始化指定 HTTP(S) 代理 | `--proxy http://proxy-host:8080` |
| `--no-proxy` | 强制直连，不读取环境或系统代理 | `gz-cli init demo --no-proxy` |
| `--refresh` | 忽略配置和模板缓存，强制获取远程最新内容 | `gz-cli init demo --refresh` |
| `-i, --internal` | 使用随 CLI 发布的内置微应用模板，不访问 GitHub | `gz-cli init demo --internal` |

## 内网初始化

从 `gz-cli-front@1.0.2` 起，内网无法访问 GitHub 时执行：

```bash
gz-cli init demo-app --internal
# 简写
gz-cli init demo-app -i
```

直接生成内置 `micro-app`，跳过远程模板列表和模板下载，无需选择模板。当前不内置主应用模板，
内置版本随 CLI 发布更新；`--internal` 与 `--refresh` 不能同时使用。

生成项目无需访问 GitHub。CLI 和项目依赖安装仍需可用的 npm 源，可在初始化时选择暂不安装依赖，
之后使用内网配置的 npm 源执行 `npm install`。普通 `init` 仍使用原有远程模板和缓存机制。

## 兼容入口

`gz-cli create demo-app` 与 `gz-cli init demo-app` 使用相同逻辑和参数；
`gz-cli-front init demo-app` 仍可使用。未全局安装时执行 `npx gz-cli-front init demo-app`。

## 包管理器选择

显式指定：

```bash
gz-cli init demo-app --pm npm
```

未指定时，CLI 按以下顺序检测本机可用命令：

```text
pnpm → yarn → npm
```

如果前两者不可用，则使用 npm。

## 代理优先级

```text
--no-proxy
--proxy
HTTP_PROXY / HTTPS_PROXY / NO_PROXY
操作系统代理
无代理直连
```

`--no-proxy` 与 `--proxy` 只影响当前初始化过程，不修改系统或 Git 的全局配置。

## 何时使用 refresh

适合使用 `--refresh`：

- 模板刚发布了新版本，需要立即获取。
- 本地缓存疑似不完整。

日常重复创建项目不需要使用，它会失去缓存带来的速度和离线回退能力。
