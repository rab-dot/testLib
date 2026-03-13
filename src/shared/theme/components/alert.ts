const definePartsStyle = (styles: any) => styles
const defineMultiStyleConfig = (config: any) => config

const variantSnackbar = definePartsStyle((props: { colorScheme: string }) => {
  const { colorScheme: c } = props

  return {
    container: {
      bg: 'brand.100',
      _dark: {
        bg: 'brand.900',
      },
      borderWidth: '1px',
    },
    icon: {
      color: `${c}.500`,
      _dark: {
        color: `${c}.500`,
      },
      '& .chakra-spinner': {
        color: 'black',
        _dark: {
          color: 'white',
        },
      },
    },
    title: { fontWeight: 'semibold', fontSize: 'md' },
    description: {
      fontSize: 'sm',
      color: 'gray.500',
      _dark: {
        color: 'gray.400',
      },
    },
  }
})

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 'md',
  },
})

export const Alert = defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
  },
  baseStyle,
  variants: {
    snackbar: variantSnackbar,
  },
})
