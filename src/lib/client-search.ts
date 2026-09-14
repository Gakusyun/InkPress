import type { SearchDoc } from './search';
import { isLatinQuery } from './pinyin';

/** 客户端搜索评分：无依赖，可被 SearchPanel 引用 */
export function scoreDoc(doc: SearchDoc, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const terms = q.split(/\s+/).filter(Boolean);
  let total = 0;
  for (const term of terms) {
    let s = 0;
    if (doc.title.toLowerCase().includes(term)) s += 8;
    if (doc.tags.some((t) => t.toLowerCase().includes(term))) s += 5;
    if (doc.description.toLowerCase().includes(term)) s += 3;
    if (doc.body.toLowerCase().includes(term)) s += 1;

    // 拼音 / 首字母（构建期写入索引）
    if (isLatinQuery(term)) {
      if (doc.titlePy && doc.titlePy.includes(term)) s += 4;
      if (doc.titlePyi && doc.titlePyi.includes(term)) s += 3;
      if (doc.tagsPy && doc.tagsPy.includes(term)) s += 3;
      if (doc.tagsPyi && doc.tagsPyi.includes(term)) s += 2;
      if (doc.bodyPy && doc.bodyPy.includes(term)) s += 2;
      if (doc.bodyPyi && doc.bodyPyi.includes(term)) s += 1;
    }

    if (s === 0) return 0;
    total += s;
  }
  return total;
}

export function searchDocs(docs: SearchDoc[], query: string): SearchDoc[] {
  return docs
    .map((d) => ({ d, s: scoreDoc(d, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.d);
}

export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
