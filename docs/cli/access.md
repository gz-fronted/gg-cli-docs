---
title: 网络与访问
order: 3
toc: content
---

# 网络与访问

正常情况下直接执行 `gg-cli init` 即可。只有下载失败时，才需要关注本页。

## 仓库访问权限

首次使用前，请确认当前账号拥有模板访问权限，并且终端中的 Git 已登录。

如果公司统一使用 GitHub CLI，可以执行：

```bash
gh auth status
```

## 使用代理

临时指定代理：

```bash
gg-cli init my-app --proxy http://proxy-host:8080
```

强制直连：

```bash
gg-cli init my-app --no-proxy
```

## 获取最新模板

```bash
gg-cli init my-app --refresh
```

日常创建项目不需要添加 `--refresh`。
