/// <reference types="astro/client" />

interface Window {
  __refreshCodeFields?: () => void;
  __applyUserCss?: () => void;
  __runUserJs?: () => void;
}
