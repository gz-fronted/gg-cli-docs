---
title: 快速开始
order: 1
---

# 快速开始

如果你刚加入团队，可以把 gg-cli 理解为项目的统一起点：它负责创建项目，并准备好页面开发、接口请求、本地 Mock、质量检查和多环境构建所需的基础能力。

<div class="gz-callout">
  <strong>先记住这条路径：</strong>用 gg-cli 创建项目 → 用 gg-ui 写页面 → 用 gz-pc 调接口 → 按目标环境执行构建命令。
</div>

## 1. 创建项目

准备 Node.js `22.19.0` 或更高版本，然后执行：

```bash
npm install -g @chenhui996/gg-cli
gg-cli init demo-app
cd demo-app
npm run dev
```

创建时只需要根据项目角色选择模板：

| 你要开发什么 | 选择 |
| --- | --- |
| 普通业务模块，可独立开发，也要接入现有门户 | `micro-app` |
| 负责菜单、布局和加载其他微应用的门户 | `main-app` |

多数业务项目选择 `micro-app`。不确定时先向项目负责人确认，不要仅根据项目名称猜测。

## 2. 打开项目先看哪里

不需要一开始读完所有配置，先找到与业务开发最相关的目录：

```text
src/pages/       页面
src/components/  跨页面复用组件
src/api/         后端接口函数
src/store/       跨页面共享状态
mock/            本地 Mock 数据
docs/            当前项目的开发规范
```

`package.json` 告诉你项目支持哪些命令，`.env.*` 告诉你不同环境连接到哪里。构建配置、Garfish 生命周期等内容只有在确实需要修改时再深入了解。

## 3. 开发一个页面

日常开发优先使用团队已经提供的能力：

- 页面和业务组件优先使用 [gg-ui](/gg-ui)，保持交互和视觉一致。
- 接口统一放在 `src/api`，通过 [gz-pc](/gz-pc/fetch) 发起请求。
- 后端接口未就绪时执行 `npm run mock`，不要把临时假数据写进页面组件。
- 跨页面共享的数据放进 `src/store`；只在当前组件使用的状态保留在组件内。
- 开始修改前先查看项目自己的 `docs/agent-references`，它比本站更贴近当前项目代码。

完整的开发步骤和提交提示见[开发提示](/getting-started/development-guide)。

## 4. 选择正确的命令

| 现在要做什么 | 命令 |
| --- | --- |
| 本地开发，连接真实接口 | `npm run dev` |
| 本地开发，使用 Mock 数据 | `npm run mock` |
| 构建到内网开发环境 | `npm run build:dev` |
| 构建到内网 SIT 环境 | `npm run build:sit` |
| 正式生产构建 | `npm run build` |
| 分析构建包体积 | `npm run analyze` |

`dev` 和 `mock` 不能用于服务器部署。部署时根据目标环境选择构建命令，并发布生成的 `dist/`。详细环境映射见[项目命令](/commands)。

## 5. 提交前检查

- 页面在正常开发模式下可以使用。
- 有 Mock 的功能也验证过真实接口模式。
- 没有把 Token、账号或真实业务数据写进代码和 Mock。
- 使用项目 `package.json` 中已有的检查、测试和格式化命令。
- 涉及微应用入口时，同时验证独立运行和主应用挂载。

## 接下来按需阅读

| 你想了解 | 文档 |
| --- | --- |
| 这个脚手架解决什么问题 | [项目特点](/getting-started/background) |
| 日常开发应该遵循哪些约定 | [开发提示](/getting-started/development-guide) |
| micro-app 和 main-app 的区别 | [项目模板](/templates) |
| 请求、Hooks 和工具函数 | [gz-pc](/gz-pc) |
| 团队 UI 组件 | [gg-ui](/gg-ui) |
| 开发或部署遇到问题 | [常见问题](/faq) |

脚手架自身的可选参数只在需要切换包管理器、代理或刷新模板时查看：[gg-cli 参数](/cli/commands)。
