---
title: 模板概览
order: 1
toc: content
---

# 项目模板

创建项目时只需要判断：你是在开发业务微应用，还是负责承载其他应用的主应用。

| 模板 | 选择它的情况 | 主要职责 |
| --- | --- | --- |
| micro-app | 大多数业务项目 | 页面、路由、状态、接口和 Mock；支持独立开发及主应用挂载 |
| main-app | 门户、工作台或微前端容器 | 全局布局、应用注册和加载、主子应用通信 |

<div class="gz-callout">
  <strong>新人选择建议：</strong>如果你的需求是新增一个业务模块或一组业务页面，通常选择 micro-app。只有项目需要管理其他微应用时才选择 main-app。
</div>

## 内网模板

从 `gz-cli-front@1.0.2` 起，可直接使用随 CLI 发布的微应用模板：

```bash
gz-cli init demo-app --internal
```

支持简写 `-i`，跳过远程模板列表和下载，不依赖本地缓存。当前只内置 `micro-app`，
`main-app` 仍需通过普通远程模式获取。内置模板随 CLI 版本更新，项目依赖仍需从可用的 npm 源安装。

## 两种模板都遵循的基线

- React 19 与 TypeScript 5。
- Vite 多环境开发和生产构建。
- React Router 7 与 Zustand 5。
- Less、ESLint、Prettier、Vitest。
- gz-ui-web；缺失组件时按规范使用 Ant Design。
- ECharts 与 AG Grid 等业务基础能力。

开始开发前先阅读[快速开始](/getting-started)；不同模板的具体版本和脚本以生成项目的 `package.json` 为准。项目创建完成后独立维护，不会被后续模板自动覆盖。
