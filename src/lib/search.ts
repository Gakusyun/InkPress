import type { Post } from './posts';
import { toSearchPinyin } from './pinyin';
import { SEARCH } from '../consts';

/** 构建时搜索索引字段 */
export interface SearchDoc {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** 截断后的纯文本，避免索引膨胀 */
  body: string;
  url: string;
  /** 标题拼音（无音调、无空格） */
  titlePy: string;
  /** 标题拼音首字母 */
  titlePyi: string;
  /** 标签拼音 */
  tagsPy: string;
  /** 标签拼音首字母 */
  tagsPyi: string;
  /** 正文前缀拼音（短截断，控制索引体积） */
  bodyPy: string;
  /** 正文前缀拼音首字母 */
  bodyPyi: string;
}

const BODY_LIMIT = SEARCH.bodyLimit;
const BODY_PY_LIMIT = SEARCH.bodyPinyinLimit;

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[*_~#>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildSearchDocs(posts: Post[], rawBodies: Map<string, string>): SearchDoc[] {
  return posts.map((post) => {
    const raw = rawBodies.get(post.id) ?? '';
    const body = stripMarkdown(raw).slice(0, BODY_LIMIT);
    const titlePy = toSearchPinyin(post.data.title);
    const tagsPy = toSearchPinyin(post.data.tags.join(' '));
    const bodyPy = toSearchPinyin(body.slice(0, BODY_PY_LIMIT));
    return {
      id: post.id,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      body,
      url: `/posts/${post.id}`,
      titlePy: titlePy.full,
      titlePyi: titlePy.initials,
      tagsPy: tagsPy.full,
      tagsPyi: tagsPy.initials,
      bodyPy: bodyPy.full,
      bodyPyi: bodyPy.initials,
    };
  });
}
