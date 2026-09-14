import { pinyin } from 'pinyin-pro';

/**
 * 构建期拼音：仅进搜索索引，不进入客户端打包体积。
 * nonZh: 'consecutive' 保留英文/数字片段。
 */
export function toSearchPinyin(text: string): { full: string; initials: string } {
  if (!text) return { full: '', initials: '' };
  const full = pinyin(text, {
    toneType: 'none',
    type: 'array',
    nonZh: 'consecutive',
  }).join('');
  const initials = pinyin(text, {
    pattern: 'first',
    toneType: 'none',
    type: 'array',
    nonZh: 'consecutive',
  }).join('');
  return { full: full.toLowerCase(), initials: initials.toLowerCase() };
}

export function isLatinQuery(term: string): boolean {
  return /^[a-z0-9]+$/i.test(term);
}
