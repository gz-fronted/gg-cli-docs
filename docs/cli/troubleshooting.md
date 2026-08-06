---
title: 常见问题
order: 4
---

# CLI 常见问题

## Node.js 版本过低

当前 CLI 要求 Node.js 不低于 `22.19.0`。升级后重新打开终端，再执行：

```bash
node -v
gg-cli --version
```

## 无法下载模板

依次检查：

1. 当前账号是否拥有仓库读取权限。
2. GitHub CLI、SSH 或 Git Credential Manager 是否已经登录。
3. 当前账号的仓库权限是否生效。
4. 当前网络是否需要代理。

不要把个人 Token 写进命令、项目文件或截图。

## 模板不是最新版本

```bash
gg-cli init demo-app --refresh
```

如果仍不一致，请联系脚手架维护者确认模板是否已经发布。

## 自动安装失败

生成的项目仍会保留。进入项目目录后使用选定的包管理器手动安装：

```bash
npm install
```

安装前确认私有 npm registry 和网络代理可用。
