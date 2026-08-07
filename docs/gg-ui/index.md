---
title: gg-ui 概览
order: 1
toc: content
---

# @chenhui996/gg-ui

gg-ui 是基于 Ant Design 6 封装的企业级 React 组件库，用于统一团队业务视觉、交互模式和主题能力。

## 开发时先记住

- 业务页面优先使用 gg-ui，避免重复封装已有组件。
- gg-ui 暂未提供目标组件时，再直接使用 Ant Design。
- 沿用项目已有的 `ConfigProvider` 和主题配置，不在页面中创建另一套主题。
- 组件具体属性和示例以 gg-ui 组件文档为准。

## 特性

- TypeScript 编写并提供类型定义。
- 支持 React 18 和 React 19。
- 基于 Ant Design 主题与 CSS Variables 定制。
- 封装团队常用业务组件和标准交互。
- 提供独立 dumi 组件文档与 Demo。

## 安装

gg-cli 生成的项目已经接入 gg-ui，通常不需要再次安装。仅在已有项目手动接入时执行：

```bash
npm install @chenhui996/gg-ui antd react react-dom
```

具体 peer dependencies 以所安装版本的 `package.json` 为准。

## 使用

```tsx | pure
import { Button, ConfigProvider } from '@chenhui996/gg-ui';

export default function App() {
  return (
    <ConfigProvider theme="light">
      <Button type="primary">保存</Button>
    </ConfigProvider>
  );
}
```

开发新页面时先搜索组件文档和项目现有用法，再决定是否需要新增业务组件。通用组件能力应回到 gg-ui 维护，项目内只保留与当前业务强相关的封装。

## 组件文档地址

| 环境 | 地址 | 状态 |
| --- | --- | --- |
| 公网 | [https://gz-ui-cyan.vercel.app/](https://gz-ui-cyan.vercel.app/) | 可访问 |
| 公司内网 | 待提供 | <span class="gz-status">发布前配置</span> |

内网地址确定后更新本页即可，无需修改其他章节。
