import type { Config } from 'tailwindcss'

export default {
  content: [
      './index.html',
      './src/scripts/**/*.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

