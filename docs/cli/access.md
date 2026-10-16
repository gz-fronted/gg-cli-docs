---
title: 网络与访问
order: 3
toc: content
---

# 网络与访问

正常情况下直接执行 `gz-cli init` 即可。只有下载失败时，才需要关注本页。

## 内网无法访问 GitHub

从 `gz-cli-front@1.0.2` 起，可使用随 CLI 发布的内置微应用模板：

```bash
gz-cli init my-app --internal
```

`--internal` 可简写为 `-i`。该模式不请求远程模板列表、不克隆 GitHub 仓库，也不依赖已有缓存，
当前仅支持微应用模板。无需为模板下载配置代理或 Git 凭据。

CLI 与项目依赖仍需从可用的 npm 源安装；初始化时可以暂不安装依赖，之后再执行 `npm install`。
内置模板跟随 CLI 版本更新，不能与 `--refresh` 同时使用。

## 仓库访问权限

默认模板注册仓库和模板仓库为公共仓库，通过 HTTPS 下载，无需配置 GitHub Token 或 SSH Key。
请确认本机已安装 Git，且当前网络或代理可以访问仓库。

只有将配置改为私有仓库或 SSH 地址时，才需要对应的 Git 凭据或 SSH Key 和仓库读取权限。

## 使用代理

临时指定代理：

```bash
gz-cli init my-app --proxy http://proxy-host:8080
```

强制直连：

```bash
gz-cli init my-app --no-proxy
```

## 获取最新模板

```bash
gz-cli init my-app --refresh
```

日常创建项目不需要添加 `--refresh`。
