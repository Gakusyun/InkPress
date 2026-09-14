/**
 * 站点级配置 — fork 后只需改这里 + content/posts 里的 Markdown
 * 其它文件禁止再散落可调常量。
 */
export const SITE = {
  /** 部署域名，用于 RSS / canonical / OG */
  url: 'https://example.com',
  title: '墨刊',
  description: 'InkPress — 极简编辑部风格的静态博客框架。内容为 Markdown，构建为纯静态产物。',
  author: 'Author',
  lang: 'zh-CN',
  /** 首页每页文章数 */
  pageSize: 8,
  locale: 'zh-CN',
  /** ICP 备案号，例如「京ICP备xxxxxxxx号」；留空则底栏不显示 */
  ICP: '',
  /** 公网安备号，例如「京公网安备xxxxxxxx号」；留空则底栏不显示 */
  publicSecurity: '',
  /** 公网安备 logo（public/ 下路径）；留空则不显示 */
  publicSecurityLogo: '/police.webp',
} as const;

/** 备案查询外链（展示文案在 SITE.ICP / SITE.publicSecurity） */
export const BEIAN_LINKS = {
  icp: 'https://beian.miit.gov.cn/',
  publicSecurity: 'https://beian.mps.gov.cn/#/query/webSearch',
} as const;

/** 本机偏好 localStorage 键名 */
export const STORAGE_KEYS = {
  theme: 'theme',
  userCss: 'user-css',
  userJs: 'user-js',
} as const;

/** 搜索索引体积相关（构建期） */
export const SEARCH = {
  /** 正文进索引的最大字符数 */
  bodyLimit: 800,
  /** 正文拼音只覆盖开头一段；0 可关闭正文拼音 */
  bodyPinyinLimit: 200,
} as const;

/**
 * Web 字体（只允许下列来源）。
 * 标题中文：思源宋体；标题英文：Times New Roman；正文：MiSans；代码：Maple Mono CN
 */
export const FONTS = {
  css: [
    // 思源宋体 SC VF
    'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf@1.0.9/font.min.css',
    // MiSans Medium（正文字重 380）
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css',
    // MiSans Bold（正文字重 630）
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Bold.min.css',
    // Maple Mono CN
    'https://cdn.jsdelivr.net/npm/@chinese-fonts/maple-mono-cn@2.0.0/dist/MapleMono-CN-Regular/result.min.css',
  ],
  js: [
    // Times New Roman
    'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/index.min.js',
  ],
} as const;
