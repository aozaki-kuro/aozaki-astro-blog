import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.aozaki.cc',
  output: 'static',

  integrations: [
    icon(),
    sitemap({ filter: page => page !== 'https://blog.aozaki.cc/photography/' }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
