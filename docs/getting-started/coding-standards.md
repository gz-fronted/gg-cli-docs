---
title: 编码规范
order: 7
toc: content
---

# 编码规范

先遵循当前项目已有写法，再参考项目内文档。不要在完成业务需求时顺手改造无关基础设施。

## 日常约定

- 页面放在 `src/pages`，可复用交互再拆到 `src/components`。
- 组件优先使用 gg-ui；缺失时再使用 Ant Design。
- 接口集中在 `src/api`，统一使用 gz-pc 请求能力。
- 只有跨页面共享的数据才进入 store。
- 不在代码中写死接口 Host、Token 或环境判断。
- 页面需要覆盖加载、空数据、失败和无权限等必要状态。
- 提交前执行项目已有的类型检查、Lint、格式化和测试命令。

## 项目中的 docs

生成项目自带 `docs/agent-references`，内容比本站更贴近当前模板版本。开始需求前，只阅读与本次工作有关的章节：

| 开发内容 | 优先查看 |
| --- | --- |
| 页面和组件 | React、样式、UI 组件规范 |
| 接口与联调 | API、gzFetch、Mock 规范 |
| 表格或图表 | AG Grid、ECharts 约定 |
| 状态与 Hooks | 状态管理、Hooks 规范 |
| 提交代码 | ESLint、Stylelint、Prettier、测试规范 |

如果本站与项目内文档存在差异，以当前项目代码和项目内文档为准。

