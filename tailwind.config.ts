import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      backgroundColor: {
        'purple-to-pink': 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
      }
    },
  },
  plugins: [],
}
export default config
