import { defineStyle } from '@chakra-ui/react'

const customIconButton = defineStyle({
  background: 'accent.blue',
  color: 'white',
  _hover: {
    bg: 'accent.blue',
    color: 'white',
  },
  boxShadow: 'dark-lg',
  _dark: {
    background: 'accent.blue',
    color: 'brand.400',
    _hover: {
      bg: 'accent.blue',
      color: 'white',
    },
  },
})

export const Button = {
  variants: { customIconButton },
  baseStyle: {
    fontFamily: 'Montserrat',
  },
  defaultProps: {
    size: 'sm',
  },
}
