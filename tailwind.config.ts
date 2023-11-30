import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--custom-font)'],
        serif: ['var(--custom-font)'],
        // mono: ['var(--my-custom-font)'],
        // body: ['var(--my-custom-font)'],
        // display: ['var(--my-custom-font)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        pointBg: 'rgb(251,242,215,0.85)',
        pointSubBg: '#f6f6f6',
        pointColor: '#d1e8f8',
        gray1: '#d9d9d9',
        gray2: '#e2e2e2',
        gray3: '#e5e5e5',
        bk: '#2f2f2f',
      },
      fontSize: {
        h4: '1.125rem',
        body2: '1rem',
        body3: '0.875rem',
        body4: '0.75rem',
        body5: '0.6875rem',
        body6: '0.6rem',
      },
      keyframes: {
        slide: {
          '10%': {
            opacity: '1',
          },
          '20%': {
            opacity: '1',
          },
          '30%': {
            opacity: '0',
          },
        },
      },
      animation: {
        slide: 'slide 4s ease infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
export default config
