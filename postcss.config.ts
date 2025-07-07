import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'

const config = {
  plugins: [autoprefixer(), tailwindcss()],
}

export default config
