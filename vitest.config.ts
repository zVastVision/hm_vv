/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vitest',
        'vue',
        'vue-router',
        {
          from: 'vee-validate',
          imports: ['useField'],
        },
      ],
      dts: true, // generate TypeScript declaration
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
