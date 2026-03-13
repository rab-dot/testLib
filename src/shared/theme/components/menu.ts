const defineMultiStyleConfig = (config: any) => config
const definePartsStyle = (styles: any) => styles

const theme = definePartsStyle({
  list: {
    bg: 'brand.100',
    borderRadius: 'md',
    boxShadow: 'lg',
    border: '0.5px solid',
    borderColor: 'border.light',
    p: 2,
    _dark: {
      bg: 'brand.900',
      borderColor: 'border.dark',
    },
  },
  item: {
    bg: 'brand.100',
    px: 2,
    borderRadius: 'md',
    _dark: {
      bg: 'brand.900',
    },
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle: theme })
