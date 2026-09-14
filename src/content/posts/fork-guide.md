---
title: Fork 这个框架之后
description: 改站点信息、品牌色，然后开始写自己的第一篇文章。
pubDate: 2026-01-18
tags: [指南, 维护]
---

## 三分钟上手

1. 改 `src/consts.ts` 里的 `title` / `description` / `author` / `url`
2. 改 `src/styles/tokens.css` 的 `--color-accent`
3. 删掉 `src/content/posts/` 下的示例文
4. 新建 `my-first-post.md` 开写

## 建议的仓库结构（你自己的博客）

```text
my-blog/
  src/content/posts/   ← 只放你的文章
  src/consts.ts        ← 站点元信息
  src/styles/tokens.css
```

框架文件尽量少动；升级时你主要关心 content 和 tokens。

## 主题与注入

- 默认跟随系统外观
- 「设置」里可固定亮色/暗色
- 也可在设置里写 CSS/JS，只存你自己的浏览器

祝写作顺利。
