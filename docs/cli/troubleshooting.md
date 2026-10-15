---
title: 常见问题
order: 4
toc: content
---

# CLI 常见问题

## Node.js 版本过低

当前 CLI 要求 Node.js 不低于 `22.19.0`。升级后重新打开终端，再执行：

```bash
node -v
gz-cli --version
```

## 无法下载模板

依次检查：

1. 本机是否已安装 Git。
2. 当前网络或代理能否访问注册仓库和模板仓库。
3. 配置中的仓库地址和版本是否正确。
4. 使用私有仓库或 SSH 地址时，再检查凭据和读取权限。默认公共 HTTPS 仓库无需登录。

不要把个人 Token 写进命令、项目文件或截图。

## 模板不是最新版本

```bash
gz-cli init demo-app --refresh
```

如果仍不一致，请联系脚手架维护者确认模板是否已经发布。

## 自动安装失败

生成的项目仍会保留。进入项目目录后使用选定的包管理器手动安装：

```bash
npm install
```

安装前确认私有 npm registry 和网络代理可用。
