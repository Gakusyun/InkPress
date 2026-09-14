---
title: 代码示例与排版
description: 展示代码块、引用与列表在编辑部风格下的效果。
pubDate: 2026-01-10
updatedDate: 2026-01-11
tags: [示例]
---

## 代码

```js
export function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
```

```bash
pnpm build
pnpm preview
```

## 引用

> 约束带来一致性。样式只从 token 来，fork 换肤只改 accent。

## 列表

1. 写 Markdown
2. `pnpm build`
3. 上传 `dist/`

- 无服务端
- 无数据库
- 无跟踪脚本

行内代码：`--color-accent`。
