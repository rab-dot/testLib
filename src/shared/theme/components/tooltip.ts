import { defineStyle } from '@chakra-ui/react'

const arrowBg = '--popper-arrow-bg'

const baseStyle = defineStyle({
  borderRadius: 'md',
  fontWeight: 'normal',
  boxShadow: 'md',
  border: '1px solid',
  borderColor: 'brand.400',
  p: 2,
  _dark: {
    bg: 'brand.800',
    borderColor: 'brand.600',
    color: 'brand.400',
    [arrowBg]: 'brand.800',
  },
  _light: {
    bg: 'brand.100',
    color: 'brand.600',
    [arrowBg]: 'brand.100',
  },
})

export const Tooltip = { baseStyle }
