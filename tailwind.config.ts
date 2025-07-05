import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', 'html'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
