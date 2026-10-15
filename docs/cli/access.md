---
title: 网络与访问
order: 3
toc: content
---

# 网络与访问

正常情况下直接执行 `gz-cli init` 即可。只有下载失败时，才需要关注本页。

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
