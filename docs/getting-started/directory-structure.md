---
title: 目录结构
order: 3
toc: content
---

# 目录结构

以 `micro-app` 为例，新人优先关注以下目录：

```text
src/
├─ pages/        页面与页面级模块
├─ components/   跨页面复用组件
├─ api/          后端接口函数与类型
├─ store/        跨页面共享状态
└─ utils/        项目内工具函数
mock/            本地 Mock 声明
docs/            当前项目的开发规范
.env.*           各构建环境变量
package.json     项目命令与依赖
```

## 新需求从哪里开始

| 要做的事情 | 先看哪里 |
| --- | --- |
| 修改页面 | `src/pages` 中对应业务模块 |
| 复用组件 | `src/components` 和 gg-ui |
| 调用接口 | `src/api` |
| 跨页面共享数据 | `src/store` |
| 后端尚未提供接口 | `mock` |
| 确认开发规则 | `docs/agent-references` |

普通业务开发不需要先理解全部构建配置或 Garfish 生命周期。只有修改微应用入口、激活路径或主应用通信时，再查看[项目模板](/templates)。

