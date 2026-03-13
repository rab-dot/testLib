const defineMultiStyleConfig = (config: any) => config
const definePartsStyle = (styles: any) => styles

export const theme = definePartsStyle({
  arrow: {
    bg: 'brand.100',
    _dark: {
      bg: 'brand.900',
    },
  },
  content: {
    bg: 'brand.100',
    border: '1px solid',
    boxShadow: 'xl',
    borderColor: 'border.light',
    _dark: {
      bg: 'brand.900',
      borderColor: 'border.dark',
    },
  },
})

export const Popover = defineMultiStyleConfig({ baseStyle: theme })
