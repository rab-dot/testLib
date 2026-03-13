import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    breakpoints: { '2lg': '1060px' },
    tokens: {
      colors: {
        brand: {
          900: { value: '#151521' },
          800: { value: '#1e1e2d' },
          700: { value: '#2A2A3C' },
          600: { value: '#565674' },
          500: { value: '#393945' },
          400: { value: '#E4E6EF' },
          300: { value: '#E8E8E8' },
          200: { value: '#F5F8FA' },
          100: { value: '#FFFFFF' },
        },
        accent: {
          blue: { value: '#009EF7' },
          purple: { value: '#7239EA' },
          green: { value: '#50CD89' },
          yellow: { value: '#FFC700' },
          red: { value: '#F1416C' },
        },
        accentBg: {
          blue: { value: '#212e48' },
          purple: { value: '#2f264f' },
          green: { value: '#1c3238' },
          yellow: { value: '#382f28' },
          red: { value: '#3a2434' },
        },
        accentBgLight: {
          blue: { value: '#f1faff' },
          purple: { value: '#f8f5ff' },
          green: { value: '#e8fff3' },
          yellow: { value: '#fff8dd' },
          red: { value: '#fff5f8' },
        },
        text: {
          100: { value: '#A1A5B7' },
        },
        border: {
          light: { value: 'rgb(244,244,244)' },
          dark: { value: 'rgb(43,43,64)' },
        },
      },
      fonts: {
        body: { value: 'Montserrat, sans-serif' },
        heading: { value: 'Montserrat, sans-serif' },
      },
    },
  },
  globalCss: {
    'html, body': {
      height: '100%',
      width: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '*': {
      scrollBehavior: 'smooth',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      display: 'flex',
      width: '100%',
      flex: 1,
      flexDirection: 'column',
    },
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
      borderRadius: 'md',
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-track': {
      bg: 'blackAlpha.500',
      borderRadius: 'md',
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-thumb': {
      bg: 'whiteAlpha.700',
      borderRadius: 'md',
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      bg: 'whiteAlpha.800',
    },
  },
})

const theme = createSystem(defaultConfig, customConfig)

export type SystemType = typeof theme

export default theme
export { default as ThemeSwitcher } from './switcher/ThemeSwitcher'
