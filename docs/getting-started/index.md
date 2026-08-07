---
title: 快速上手
order: 1
toc: content
---

# 快速上手

用 gg-cli 创建一个符合团队约定、可以立即开发的 React 项目。

## 环境准备

确保本机 Node.js 版本不低于 `22.19.0`：

```bash
node -v
```

安装 gg-cli：

```bash
npm install -g @chenhui996/gg-cli
```

## 创建项目

```bash
gg-cli init demo-app
```

根据项目角色选择模板：

| 项目类型 | 模板 |
| --- | --- |
| 普通业务模块，可独立开发并接入现有门户 | `micro-app` |
| 负责菜单、布局和加载微应用的门户 | `main-app` |

多数业务项目选择 `micro-app`。

## 启动项目

```bash
cd demo-app
npm run dev
```

终端显示本地地址后，在浏览器中打开即可开始开发。

## 接下来

- 先看[开发环境](/getting-started/environment)，了解 `dev` 与 `mock` 的区别。
- 再看[目录结构](/getting-started/directory-structure)，找到页面、接口和项目规范。
- 需要发布到测试环境时查看[命令行](/getting-started/commands)和[部署](/getting-started/deployment)。
