---
title: 欢迎使用墨刊 InkPress
description: 这是一个纯 SSG、Markdown 驱动的博客框架。fork 后只需改配置与文章。
pubDate: 2026-01-05
tags: [指南, Astro]
---

这是 **墨刊 InkPress** 的示例文章。你只需要在 `src/content/posts/` 下写 Markdown，构建后即可得到可部署到边缘静态托管的站点。

## 快速开始

```bash
pnpm install
pnpm dev
```

编写新文章：

```markdown
---
title: 我的第一篇文章
description: 可选摘要
pubDate: 2026-01-06
tags: [随笔]
---

正文写在这里。
```

## Frontmatter

| 字段 | 说明 |
|------|------|
| `title` | 必填 |
| `description` | 列表与 RSS 摘要 |
| `pubDate` | 发布日期 |
| `updatedDate` | 可选 |
| `tags` | 字符串数组 |
| `draft` | `true` 时构建忽略 |

## 设计约定

视觉 token 集中在 `src/styles/tokens.css`，组件禁止写死颜色。详见仓库根目录的 `STYLE.md`。

```ts
// 代码高亮由构建期 Shiki 完成，无客户端 JS
const site = {
  title: '墨刊',
  mode: 'ssg',
};
```

## 部署

`pnpm build` 后把 `dist/` 丢到 EdgeOne Pages、Cloudflare Pages、Vercel 或任意静态服务器即可。
