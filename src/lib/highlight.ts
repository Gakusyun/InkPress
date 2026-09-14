import type { SearchDoc } from './search';

export type HighlightLang = 'css' | 'js';

function escapeHtml(s: string) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/** 轻量高亮，供设置页 CodeField 使用 */
export function highlightCode(code: string, lang: HighlightLang): string {
  const escaped = escapeHtml(code);
  if (lang === 'css') {
    return escaped
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-c">$1</span>')
      .replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="tok-s">$1</span>')
      .replace(/(--[\w-]+)/g, '<span class="tok-p">$1</span>')
      .replace(/(@[a-zA-Z-]+)/g, '<span class="tok-a">$1</span>')
      .replace(
        /(^|[{};,\s])([.#]?[a-zA-Z_][\w-]*)(?=\s*\{)/g,
        '$1<span class="tok-t">$2</span>',
      )
      .replace(/([a-zA-Z-]+)(\s*:\s*)/g, '<span class="tok-k">$1</span>$2')
      .replace(/(#[0-9a-fA-F]{3,8}\b)/g, '<span class="tok-n">$1</span>')
      .replace(
        /\b(\d+\.?\d*(?:px|rem|em|%|vh|vw|s|ms|fr|deg)?\b)/g,
        '<span class="tok-n">$1</span>',
      );
  }
  return escaped
    .replace(/(\/\/[^\n]*)/g, '<span class="tok-c">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-c">$1</span>')
    .replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="tok-s">$1</span>')
    .replace(/(`(?:\\.|[^`\\])*`)/g, '<span class="tok-s">$1</span>')
    .replace(
      /\b(const|let|var|function|return|if|else|for|while|class|new|import|export|from|async|await|try|catch|typeof|of|in)\b/g,
      '<span class="tok-k">$1</span>',
    )
    .replace(/\b(true|false|null|undefined|this)\b/g, '<span class="tok-n">$1</span>')
    .replace(
      /\b(document|window|localStorage|console)\b/g,
      '<span class="tok-p">$1</span>',
    );
}

export type { SearchDoc };
