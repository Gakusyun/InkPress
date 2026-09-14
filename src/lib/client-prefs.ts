import { STORAGE_KEYS } from '../consts';

export type ThemeMode = 'light' | 'dark' | 'system';

export const USER_CSS_KEY = STORAGE_KEYS.userCss;
export const USER_JS_KEY = STORAGE_KEYS.userJs;
export const THEME_KEY = STORAGE_KEYS.theme;

export function getThemeMode(root: HTMLElement = document.documentElement): ThemeMode {
  const attr = root.getAttribute('data-theme');
  return attr === 'light' || attr === 'dark' ? attr : 'system';
}

export function setThemeMode(mode: ThemeMode, root: HTMLElement = document.documentElement): void {
  if (mode === 'system') {
    root.removeAttribute('data-theme');
    try {
      localStorage.removeItem(THEME_KEY);
    } catch (_) {}
  } else {
    root.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (_) {}
  }
}

/** 绑定 [data-theme-seg] 内的 [data-theme-set] 按钮 */
export function bindThemeControls(scope: ParentNode = document): void {
  const buttons = scope.querySelectorAll<HTMLButtonElement>('[data-theme-set]');
  if (!buttons.length) return;

  const sync = () => {
    const m = getThemeMode();
    for (const btn of buttons) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-theme-set') === m ? 'true' : 'false');
    }
  };

  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-theme-set');
      if (next === 'light' || next === 'dark' || next === 'system') {
        setThemeMode(next);
        sync();
      }
    });
  }
  sync();
}

/** 与 BaseLayout is:inline 中的实现保持一致（head 末尾，最高级联优先） */
export function applyUserCss(): void {
  try {
    const css = localStorage.getItem(USER_CSS_KEY) || '';
    let el = document.getElementById('user-css');
    if (!el) {
      el = document.createElement('style');
      el.id = 'user-css';
      el.setAttribute('data-priority', 'user');
    }
    if (!css.trim()) {
      el.remove();
      return;
    }
    el.textContent = css;
    document.head.appendChild(el);
  } catch (err) {
    console.error('[user inject css]', err);
  }
}

export function runUserJs(): void {
  try {
    const js = localStorage.getItem(USER_JS_KEY);
    if (js && js.trim()) new Function(js)();
  } catch (err) {
    console.error('[user inject js]', err);
  }
}

export function saveUserInject(css: string, js: string): void {
  localStorage.setItem(USER_CSS_KEY, css);
  localStorage.setItem(USER_JS_KEY, js);
  applyUserCss();
}

export function clearUserInject(): void {
  localStorage.removeItem(USER_CSS_KEY);
  localStorage.removeItem(USER_JS_KEY);
  applyUserCss();
}
