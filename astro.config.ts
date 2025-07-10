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
        return !new URL(page).pathname.startsWith('/photography/')
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: process.env.DOCKER ? true : undefined,
    },
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
