---
title: Hooks 与工具函数
order: 4
---

# Hooks 与工具函数

## Hooks

`@gz-fronted/gz-pc/hooks` 通过 `export * from 'ahooks'` 透传 ahooks 的公开 API，作为团队统一导入入口：

```ts
import {
  useDebounce,
  useDebounceFn,
  usePagination,
  useRequest,
} from '@gz-fronted/gz-pc/hooks';
```

后续团队自定义 Hook 也会从同一路径导出。新增自定义 Hook 时不得与 ahooks 已有导出重名。

## formatDate

```ts
import { formatDate } from '@gz-fronted/gz-pc/utils';

formatDate(new Date());
formatDate(Date.now(), 'YYYY-MM-DD');
```

支持 `string | number | Date | null | undefined`。空值、空字符串和无效日期统一返回 `--`。

## Query 转换

```ts
import { objectToQuery, queryToObject } from '@gz-fronted/gz-pc/utils';

queryToObject('https://example.com/list?page=1&tag=a&tag=b');
// { page: '1', tag: ['a', 'b'] }

objectToQuery({ page: 1, tag: ['a', 'b'] });
// page=1&tag=a&tag=b
```

这些工具不依赖 React、ahooks、Axios 或 gg-ui，适合在纯 TypeScript 模块使用。
