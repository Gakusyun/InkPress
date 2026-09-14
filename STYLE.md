# STYLE.md — 墨刊 InkPress 设计与样式规范

本文件是本仓库唯一的视觉与样式契约。改 UI 前先读这里；fork 后若只想换品牌色，只改 `src/styles/tokens.css` 中标注的 token。

## 1. 风格锚点

**极简编辑部（Minimal Editorial）**

气质参照：纸质杂志内页 + 技术笔记，而不是 SaaS 落地页。

| 不要 | 要 |
|------|-----|
| 大面积渐变、玻璃拟态、重阴影 | 纸感底色、细分割线、克制层次 |
| 多主色、彩虹标签 | 近单色 + 一个强调色 |
| 圆角卡片堆砌成瀑布流 | 列表行、分隔、留白建立节奏 |
| 正文两侧花哨装饰 | 正文栏专注可读 |

## 2. 色板（CSS Tokens）

所有颜色只允许来自 `src/styles/tokens.css`，禁止在组件里写死 `#hex`。

### Light（默认）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#faf9f7` | 页面纸感底 |
| `--color-bg-elevated` | `#ffffff` | 代码块、浮层 |
| `--color-ink` | `#1a1a1a` | 正文/标题 |
| `--color-ink-muted` | `#6e6b66` | 次要信息、日期 |
| `--color-ink-faint` | `#9c9892` | 占位、禁用 |
| `--color-border` | `#e7e4df` | 分割线、描边 |
| `--color-accent` | `#1f5c4d` | 链接、强调、进度条 |
| `--color-accent-soft` | `#e6f0ec` | 标签底、选中态 |

### Dark

| Token | 值 |
|-------|-----|
| `--color-bg` | `#121211` |
| `--color-bg-elevated` | `#1c1c1a` |
| `--color-ink` | `#eceae6` |
| `--color-ink-muted` | `#a8a49c` |
| `--color-ink-faint` | `#6e6a64` |
| `--color-border` | `#2c2b28` |
| `--color-accent` | `#7dbaa6` |
| `--color-accent-soft` | `#1a2e28` |

主题切换：`html[data-theme="dark"]`；跟随系统用 `prefers-color-scheme` 兜底。组件不得自己发明第二套暗色。

## 3. 字体

只用 `consts.ts` → `FONTS` 中声明的 Web 字体，禁止系统字体栈与未列出字体。

| 角色 | font-family |
|------|-------------|
| Display / 标题 | `"Source Han Serif SC VF", "Times New Roman", serif`（VF，`--weight-display: 600`） |
| Body / 正文 | `"MiSans", "Source Han Serif SC VF", "Times New Roman", serif`（Medium 380 / Bold 630） |
| Mono / 代码 | `"Maple Mono CN", monospace` |

来源：思源宋体 SC VF、MiSans Medium+Bold、Maple Mono CN（jsDelivr CSS）+ Times New Roman（canvas-fonts JS）。`font-synthesis: none`，加粗不用伪粗体。

### 字号阶（rem，根 16px）

| Token | 值 | 用途 |
|-------|-----|------|
| `--text-xs` | `0.75rem` | 标签、脚注 |
| `--text-sm` | `0.875rem` | meta、导航 |
| `--text-base` | `1.0625rem` | 正文 |
| `--text-lg` | `1.25rem` | 引言、卡片标题 |
| `--text-xl` | `1.5rem` | h2 |
| `--text-2xl` | `1.875rem` | h1 / 文章标题 |
| `--text-3xl` | `2.25rem` | 首页大标题（慎用） |

正文行高 `1.75`；标题行高 `1.25`；中英混排标题允许 `letter-spacing: -0.01em`。

## 4. 布局

- **阅读栏**：`--measure: 42rem`（约 672px），文章正文、TOC 对齐此栏。
- **宽栏**：`--width-wide: 56rem`，列表页、页眉页脚内容区。
- **页边**：左右 `clamp(1rem, 4vw, 2rem)`；区块垂直节奏 `--space-section: 3rem ~ 4.5rem`。
- **栅格**：文章页可选 `正文 + 右侧 TOC`（≥960px）；小屏 TOC 收起为顶部摘要或隐藏。
- **最大密度**：首页列表一屏约 5–8 条，不要塞满。

### 间距阶

`--space-1` 0.25rem … `--space-2` 0.5rem … `--space-3` 0.75rem … `--space-4` 1rem … `--space-6` 1.5rem … `--space-8` 2rem … `--space-12` 3rem。

## 5. 组件约定

| 组件 | 规则 |
|------|------|
| 页眉 | 单行：站点名（serif）+ 右侧导航；底边 1px border；高度约 3.5rem |
| 页脚 | 极简一行版权 + RSS/源码链接；不要多列营销 footer |
| PostCard | 无卡片阴影；标题 + 一行摘要 + 日期/标签；用 `border-top` 分割 |
| 标签 | 小号、accent-soft 底、无描边或极淡描边；点击进 `/tags/[tag]` |
| 代码块 | elevated 底、4px 圆角、等宽；Shiki 双主题 class，不注入额外 JS |
| 阅读进度 | 视口顶 2px accent 条，`scroll` 驱动，无布局抖动 |
| TOC | 右侧 sticky；当前节 accent + 左侧细竖线 |
| 搜索 | 输入框 + 纯客户端过滤构建时 JSON 索引；无后端 |

## 6. 动效

- 默认：`transition: color/background/border 150ms ease`。
- 禁止：大位移入场动画、视差、自动播放媒体。
- 尊重 `prefers-reduced-motion: reduce` 时关掉非必要过渡。

## 7. 可访问性

- 正文对比度 ≥ WCAG AA。
- 焦点环：`outline: 2px solid var(--color-accent); outline-offset: 2px`。
- 链接在正文中需有下划线或足够色差，不能只靠颜色。
- 图片必须有 `alt`；装饰图 `alt=""`。

## 8. 文件与命名

- 样式入口：`src/styles/global.css` → 引入 `tokens.css` + base + prose。
- Token 只在 `tokens.css`；组件局部样式用 `<style>` scoped，变量一律引用 token。
- 类名：BEM 简化或语义化短横线（`post-card__title` / `site-header`），禁止无意义缩写。

## 9. Fork 换肤最小集

1. `src/consts.ts`：`SITE.title / description / author / url`
2. `src/styles/tokens.css`：`--color-accent`、`--color-accent-soft`（及可选 bg/ink）
3. `public/favicon.svg`
4. 删除 `src/content/posts/*.md`，写入自己的文章

改完 1–2 即可得到统一、可维护的新品牌外观，无需改组件。
