# 墨刊 InkPress

基于 **Astro** 的纯 SSG 博客框架：用户只写 Markdown，构建产出可部署到 EdgeOne / Cloudflare / Vercel 等任意静态托管的小体积站点。

## 特性

- 纯静态预渲染，无服务端运行时
- 极简编辑部 UI，token 统一主题
- 主题默认跟随系统；底栏 / 设置页可固定亮色或暗色
- 文章列表 / 分页 / 归档（含标签筛选）
- 构建期代码高亮（Shiki，双主题）
- RSS
- 顶栏全文搜索弹层（`⌘/Ctrl+K`）
- 文章 TOC + 阅读进度
- 设置页：主题 + 本机 CSS/JS 注入（localStorage，仅对自己浏览器生效）

## 快速开始

```bash
pnpm install
pnpm dev
```

```bash
pnpm build    # 产出 dist/
pnpm preview
```

## 写文章

在 `src/content/posts/` 新建 `*.md`：

```markdown
---
title: 标题
description: 可选摘要
pubDate: 2026-01-06
tags: [标签]
draft: false
---

正文…
```

`draft: true` 的文章不会进入列表、RSS、搜索。

## Fork 后只需改

1. `src/consts.ts` — 站点名、描述、作者、域名
2. `src/styles/tokens.css` — `--color-accent` 等品牌色
3. `public/favicon.svg`
4. 清空示例文章，写入自己的内容

读者可在「设置」里写 CSS/JS，只存在本机，不进部署包。

## 文档

- `STYLE.md` — 视觉与样式契约
- `AGENTS.md` — 项目结构与协作约定

## 部署

`dist/` 为纯静态文件，任意静态托管均可。本仓库默认不绑定某一平台的配置文件。
