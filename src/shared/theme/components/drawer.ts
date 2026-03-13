const definePartsStyle = (styles: any) => styles
const defineMultiStyleConfig = (config: any) => config

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'brand.100',
    _dark: {
      bg: 'brand.800',
    },
  },
})

export const Drawer = defineMultiStyleConfig({
  baseStyle,
})
