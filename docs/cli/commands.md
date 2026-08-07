---
title: 命令行参数
order: 2
toc: content
---

# 命令行参数

## init

```bash
gg-cli init [project-name] [options]
```

| 参数 | 说明 | 示例 |
| --- | --- | --- |
| `[project-name]` | 可选项目名；未提供时交互输入 | `gg-cli init order-center` |
| `--pm <package-manager>` | 指定 npm、pnpm 或 yarn | `--pm npm` |
| `--proxy <url>` | 为本次初始化指定 HTTP(S) 代理 | `--proxy http://proxy-host:8080` |
| `--no-proxy` | 强制直连，不读取环境或系统代理 | `gg-cli init demo --no-proxy` |
| `--refresh` | 忽略配置和模板缓存，强制获取远程最新内容 | `gg-cli init demo --refresh` |

## 包管理器选择

显式指定：

```bash
gg-cli init demo-app --pm pnpm
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
