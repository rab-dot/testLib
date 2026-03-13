const helper = {
  defineMultiStyleConfig: (config: any) => config,
}

export const NavLink = helper.defineMultiStyleConfig({
  baseStyle: {
    container: {
      display: 'flex',
      paddingX: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 'md',
      color: 'brand.600',
      transition: 'all 0.3s',
      _activeLink: {
        color: 'accent.blue',
        '& > div': {
          bg: 'whiteAlpha.300',
          _dark: {
            bg: 'blackAlpha.300',
          },
        },
      },
    },
    link: {
      py: 2,
      gap: 2,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'md',
      transition: 'all 0.3s',
      _hover: {
        bg: 'whiteAlpha.100',
        _dark: {
          bg: 'blackAlpha.100',
        },
      },
    },
  },
})
