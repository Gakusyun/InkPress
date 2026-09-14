// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      defaultColor: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
