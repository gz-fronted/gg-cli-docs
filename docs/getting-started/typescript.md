---
title: TypeScript
order: 8
toc: content
---

# TypeScript

模板已经完成 TypeScript 基础配置。业务开发的重点是让类型描述真实数据，而不是重复调整编译选项。

## 常用写法

```ts
interface SearchParams {
  keyword?: string;
  page: number;
}

interface SearchResult {
  total: number;
  list: Array<{ id: string; name: string }>;
}
```

- 组件 Props、接口参数和响应数据需要明确类型。
- 优先使用 `unknown` 和类型收窄，不用 `any` 跳过检查。
- 公共类型放在对应业务模块附近，只有跨模块复用时才提升到公共目录。
- 不重复声明第三方库已经提供的类型。
- 提交前运行项目现有的类型检查命令。

接口泛型示例见[请求](/getting-started/request)，更具体的类型规则以项目 `docs/agent-references` 为准。

