const definePartsStyle = (styles: any) => styles
const defineMultiStyleConfig = (config: any) => config

const baseStyle = definePartsStyle({
  field: {
    bg: 'brand.100',
    _hover: {
      bg: 'brand.200',
    },
    _focus: {
      bg: 'brand.200',
    },
    _dark: {
      bg: 'brand.700',
      _focus: {
        bg: 'brand.900',
      },
      _hover: {
        bg: 'brand.900',
      },
      _autofill: {
        WebkitBoxShadow: '0 0 0px 100px #2A2A3C inset',
        border: '1px solid #4A5568',

        _focus: {
          border: '2px solid #63b3ed',
        },
      },
    },
  },
})

export const Input = defineMultiStyleConfig({ baseStyle })
