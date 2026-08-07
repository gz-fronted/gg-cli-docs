---
title: 开发环境
order: 2
toc: content
---

# 开发环境

## 基础要求

| 工具 | 要求 |
| --- | --- |
| Node.js | `22.19.0` 或更高版本 |
| 包管理器 | 优先使用项目锁文件对应的 npm、pnpm 或 yarn |
| 浏览器 | 当前版本的 Chrome 或 Edge |

切换 Node.js 版本时推荐使用 nvm。进入已有项目后，不要随意更换包管理器或删除锁文件。

## 安装依赖

新项目在创建过程中通常会自动安装依赖。已有项目根据锁文件执行对应命令：

```bash
npm install
```

## 启动模式

```bash
npm run dev
```

连接开发环境中的真实接口，适合日常开发和联调。

```bash
npm run mock
```

启用本地 Mock，适合后端接口暂未完成的页面开发。两种模式都只是本地开发服务，不生成部署产物。

## 开发前确认

- 当前项目使用的是 `micro-app` 还是 `main-app`。
- 当前需求连接真实接口还是使用 Mock。
- 项目根目录的 `README.md`、`package.json` 和 `docs/` 是否有额外约定。

