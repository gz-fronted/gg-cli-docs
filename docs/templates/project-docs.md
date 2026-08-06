---
title: 项目内规范
order: 4
---

# 项目内规范

每个生成项目都带有 `docs/agent-references`。开始改代码前，先查看与本次需求有关的章节，不需要一次读完全部文档。

| 开发内容 | 优先查看 |
| --- | --- |
| 新页面或组件 | React、TypeScript、样式和 UI 组件规范 |
| 新接口或联调 | API、gzFetch 和 Mock 规范 |
| 表格或图表 | AG Grid、ECharts 约定 |
| 公共状态或 Hooks | 状态管理和 Hooks 规范 |
| 提交代码 | ESLint、Stylelint、Prettier、测试与提交规范 |

## 使用原则

- 先参考同一项目的现有代码，再参考项目内规范。
- 项目内规范比本站更贴近当前代码版本，冲突时以项目内规范为准。
- 只把与团队公共工程有关的能力放入 gz-pc 或 gg-ui，业务逻辑留在项目内。
- 发现重复问题时补充项目文档，避免只依赖口头说明。

本站帮助你理解 gg-cli、共享工具和通用开发路径；项目内文档负责约束具体实现。日常开发清单见[开发提示](/getting-started/development-guide)。
