import type { Config } from 'tailwindcss'

export default {
    darkMode: 'selector',
    content: [
      './index.html',
      './src/scripts/**/*.{js,ts}'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config