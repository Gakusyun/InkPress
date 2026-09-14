# AGENTS.md — 墨刊 InkPress 项目约定

供本仓库内的 agent / 协作者使用。动手改代码前先读完。

## 项目是什么

**墨刊（InkPress）**：基于 Astro 的纯 SSG 博客框架。

- 用户**只写 Markdown**（`src/content/posts/**/*.md`）
- 构建产物为**纯静态** `dist/`，可放到 EdgeOne / Cloudflare / Vercel 或任意静态托管
- 目标：产物小、首屏快、UI 统一、易维护

## 技术约束

| 项 | 约定 |
|----|------|
| 包管理 | **pnpm**（禁止 npm/yarn lock 混用） |
| 运行时 | 构建期 Node；**无**服务端运行时依赖 |
| 框架 | Astro 5.x，Content Collections |
| 样式 | 设计 token 驱动，见 `STYLE.md` |
| 依赖 | 尽量少；能 SSG 的不要在客户端跑 |

常用命令：

```bash
pnpm install
pnpm dev      # 本地开发
pnpm build    # 产出 dist/
pnpm preview  # 预览构建结果
```

## 目录职责

```
src/
  consts.ts          # 唯一站点配置入口（SITE / BEIAN_LINKS / STORAGE_KEYS / SEARCH）
  content.config.ts  # 集合 schema，文章 frontmatter 契约
  content/posts/     # 唯一内容源：Markdown
  styles/tokens.css  # 唯一颜色/字号/间距 token 源
  styles/global.css  # 基础与排版入口
  layouts/           # 页面壳（BaseLayout）
  components/        # 可复用 UI
  pages/             # 路由 = 文件
  lib/               # posts / search / client-prefs / highlight / search-index / pinyin
public/              # 静态资源，原样拷贝
```

**边界规则：**

- 可调站点配置只写在 `src/consts.ts`，禁止在组件/页面里再写死域名、分页数、存储键、索引长度等
- 文章逻辑（过滤 draft、排序、标签统计）放 `src/lib/`，页面只调用
- 颜色/字体/间距禁止写死在组件里，必须用 CSS 变量
- 不新增框架级状态库、CSS 框架，除非先更新本文件并说明理由
- 评论、统计等第三方脚本：通过可选 slot / 配置注入，不写死在布局核心路径

## 文章 Frontmatter 契约

```yaml
---
title: 必填，文章标题
description: 可选，列表与 RSS 摘要
pubDate: 2026-01-01   # 必填，YYYY-MM-DD 或完整 ISO
updatedDate: 可选
tags: [示例, Astro]   # 可选，字符串数组
draft: false          # true 时构建忽略
---
```

校验在 `src/content.config.ts`；改 schema 必须同步改示例文章与本节。

## 路由约定

| 路径 | 含义 |
|------|------|
| `/`、`/page/[n]` | 首页文章列表（静态分页） |
| `/posts/[slug]` | 文章页 |
| `/archive` | 归档 + 标签筛选入口 |
| `/tags/[tag]` | 某标签下文章（与归档同构） |
| `/settings` | 外观、本机 CSS/JS 注入 |
| `/search-index.json` | 搜索索引（顶栏搜索用） |
| `/rss.xml` | RSS 2.0 |
| `/404` | 未找到 |

无独立 `/search` 页；搜索为顶栏弹层（`⌘/Ctrl+K` 或 `/`）。

## 主题

- 默认 **跟随系统**（不写 `data-theme`）
- 用户可在底栏或 `/settings` 固定亮色/暗色（`localStorage.theme`）
- 顶栏不再放主题切换按钮

## 用户自定义（运行时）

- `/settings` 提供 CSS / JS 输入框，写入 `localStorage`（`user-css` / `user-js`）
- 交互侧逻辑在 `src/lib/client-prefs.ts`；`BaseLayout` 内 `is:inline` 脚本负责首屏注入，须与其保持一致
- CSS 注入 `<style id="user-css">`（head 末尾），JS 用 `new Function` 执行
- **仅读者本机生效**，不进构建产物、不影响其他访客
- 不要加编译期 `src/user/*` 或 `SITE.inject` 之类的钩子

新增路由：优先静态预渲染；需要数据用 `getStaticPaths`。

## 搜索

- 构建时生成轻量 JSON 索引（标题、描述、标签、纯文本摘要、拼音/首字母）
- 拼音用 `pinyin-pro` **仅在构建期**（`src/lib/pinyin.ts`），不进浏览器包
- 顶栏搜索弹层读索引（另有 `/search-index.json`）
- 浏览器端过滤（`lib/client-search.ts`），**无** Algolia/后端
- 索引体积：每篇截断正文（见 `src/lib/search.ts`）

## 设计

完整视觉契约见 **`STYLE.md`**。冲突时：

1. `STYLE.md` 优先于临时审美
2. 可读性与加载性能优先于炫技
3. fork 换肤只应改 `consts.ts` + `tokens.css` + favicon

## 实现检查清单（PR / 改动后）

- [ ] `pnpm build` 成功
- [ ] `dist/` 无意外远程字体/大图
- [ ] 暗色模式下代码块、标签、进度条可读
- [ ] 新 frontmatter 字段已更新 `content.config.ts` + 本文件
- [ ] 未在组件中写死颜色
- [ ] `draft: true` 的文章不出现在列表/RSS/搜索

## 明确不做（第一版）

- 评论后端、用户系统、CMS 集成
- i18n 多语言路由
- 图片 CDN 服务端处理（可用 Astro assets 本地优化）
- Edge 动态渲染（本框架是纯 SSG）

若要做以上能力，先改本文件的范围说明再实现。
