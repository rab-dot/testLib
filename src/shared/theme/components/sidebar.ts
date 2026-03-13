import { HEADER_HEIGHT, SIDEBAR_WIDTH_IS_CLOSE } from '@/shared/config'

export const Sidebar = {
  baseStyle: {
    container: {
      bg: 'brand.100',
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'fixed',
      display: 'flex',
      flex: '1 auto',
      cursor: 'pointer',
      flexDirection: 'column',
      textOverflow: 'ellipsis',
      top: '0',
      left: '0',
      bottom: '0',
      zIndex: 2,
      justifyContent: 'space-between',
      width: `${SIDEBAR_WIDTH_IS_CLOSE}px`,
      _dark: {
        bg: 'brand.800',
      },
    },
    header: {
      height: `${HEADER_HEIGHT}px`,
      display: 'flex',
      alignItems: 'space-beetween',
      position: 'relative',
      flexShrink: '0',
      borderBottom: '1px dashed',
      borderColor: 'brand.400',
      _dark: {
        borderColor: 'brand.500',
      },
    },
    content: {
      height: '100%',
      borderRight: '1px solid',
      borderColor: 'brand.400',
      _dark: {
        borderColor: 'brand.700',
      },
    },
    footer: {
      height: '20',
      justifyContent: 'center',
      p: '1.5rem',
      borderRight: '1px solid',
      borderColor: 'brand.400',
      _dark: {
        borderColor: 'brand.700',
      },
    },
  },
}
