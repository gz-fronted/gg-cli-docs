---
title: micro-app
order: 2
---

# micro-app 模板

micro-app 是大多数业务项目使用的模板。它可以单独启动开发，也可以由 Garfish 主应用加载，不需要为了本地调试先启动整个门户。

## 适合什么项目

- 一个相对独立的业务模块或业务域。
- 需要接入现有门户菜单，同时保留独立开发能力。
- 需要页面、路由、状态、接口、Mock 和多环境构建的标准工程。

如果项目负责注册和加载其他微应用，应选择 [main-app](/templates/main-app)。

## 日常开发主要看这些目录

```text
src/
├─ pages/        # 业务页面
├─ components/   # 跨页面复用组件
├─ api/          # 接口函数与类型
├─ store/        # 跨页面共享状态
├─ router/       # 页面路由
├─ layouts/      # 页面布局
└─ config/       # 应用级配置

mock/            # 本地 Mock 声明
docs/            # 当前项目开发规范
```

普通需求通常只会修改 `pages`、`components`、`api`、`store` 和 `mock`。入口、启动配置和 Garfish 生命周期属于项目基础设施，没有明确需求时不要调整。

## 两种运行方式

| 方式 | 什么时候使用 |
| --- | --- |
| 独立运行 | 日常页面开发、接口联调和 Mock |
| 主应用挂载 | 验证菜单跳转、路由前缀、主题和主子应用通信 |

页面开发完成后至少验证独立运行。涉及路由、入口、全局样式或共享状态时，还需要在主应用中验证挂载、切换和卸载。

## 模板内置能力

- React、TypeScript、Vite、React Router 和 Zustand。
- gg-ui 与 Ant Design 组件能力。
- gz-pc 请求、Hooks 和工具函数。
- MSW 声明式 Mock。
- AG Grid、ECharts、测试和代码检查工具。

具体版本以当前项目的 `package.json` 为准。

## 开始开发

```bash
npm run dev
```

后端未就绪时使用 `npm run mock`。内网开发、SIT 与正式环境的构建命令见[项目命令](/commands)，日常编码约定见[开发提示](/getting-started/development-guide)。
