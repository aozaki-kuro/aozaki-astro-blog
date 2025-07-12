import { defineConfig, fontProviders } from 'astro/config'

import icon from 'astro-icon'

import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.aozaki.cc',
  output: 'static',

  integrations: [
    icon(),
    sitemap({
      filter: page => {
        const { pathname } = new URL(page)

        // 用一组正则来描述所有“黑名单”路径
        const blocked: RegExp[] = [
          /^\/photography\//, // 整个目录
          /^\/post\/subscription-lower-price\/?$/, // 指定文章
        ]

        // 只要命中其中一个正则，就过滤掉
        return !blocked.some(re => re.test(pathname))
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'Maple Mono',
        cssVariable: '--font-maple-mono',
        subsets: ['latin'],
        styles: ['normal'],
        weights: [400],
      },
    ],
  },
})
