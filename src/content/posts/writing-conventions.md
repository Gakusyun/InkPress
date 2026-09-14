---
title: 写作约定与目录结构
description: 内容只放 Markdown；逻辑放 lib；样式只认 token。
pubDate: 2026-01-08
tags: [指南, 维护]
---

框架目标是 **fork 即用**：你维护内容，框架维护一致的 UI。

## 目录职责

- `src/content/posts/` — 唯一内容源
- `src/lib/` — 列表、标签、搜索等纯函数
- `src/styles/tokens.css` — 颜色与排版 token
- `src/pages/` — 路由

## 为什么产物小

1. 构建期渲染 Markdown 与高亮
2. 搜索索引为截断 JSON，无第三方搜索服务
3. 不加载 Web 字体
4. 交互脚本极少（主题切换、TOC、进度条、搜索）

## 标签

标签会自动生成 `/tags` 与 `/tags/<name>` 页面，无需手动维护索引页。
