/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      height: {
        header: '50px',
      },
      width: {
        sidebar_widht_open: '180px',
        sidebar_widht_close: '60px',
      },
      colors: {
        brand: {
          900: '#151521',
          800: '#1e1e2d',
          700: '#2A2A3C',
          600: '#565674',
          500: '#393945',
          400: '#E4E6EF',
          300: '#E8E8E8',
          200: '#F5F8FA',
          100: '#FFFFFF',
        },
        none: 'none',
        transparent: 'transparent',
        accent: {
          red: '#F1416C',
          blue: '#009EF7',
          purple: '#7239EA',
          green: '#50CD89',
          yellow: '#FFC700',
        },
      },
      backgroundColor: {
        accentBgDark: {
          blue: '#212e48',
          purple: '#2f264f',
          green: '#1c3238',
          yellow: '#382f28',
          red: '#3a2434',
        },
        accentBg: {
          blue: '#f1faff',
          purple: '#f8f5ff',
          green: '#e8fff3',
          yellow: '#fff8dd',
          red: '#fff5f8',
        },
      },
      fontFamily: {
        sans: ['Montserrat'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'panel',
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: {
              DEFAULT: '#151521',
              foreground: '#f5f8fa',
            },
            content1: {
              DEFAULT: '#1e1e2d',
            },
            content2: {
              DEFAULT: '#2A2A3C',
            },
          },
        },
        light: {
          colors: {
            background: {
              DEFAULT: '#FFFFFF',
            },
            content1: {
              DEFAULT: '#F5F8FA',
            },
            content2: {
              DEFAULT: '#e8e8e8',
            },
          },
        },
      },
    }),
  ],
}

export default config
//brand
// 900: '#151521',
// 800: '#1e1e2d',
// 700: '#2A2A3C',
// 600: '#565674',
// 500: '#393945',
// 400: '#E4E6EF',
// 300: '#E8E8E8',
// 200: '#F5F8FA',
// 100: '#FFFFFF',
