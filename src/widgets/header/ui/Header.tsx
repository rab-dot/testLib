import { Box, Flex } from '@chakra-ui/react'
import { UserProfile } from '@/features/user-profile'
import { Logout } from '@/features/user-logout'
import { UserSettings } from '@/features/user-settings'
import { ThemeSwitcher } from '@/shared/theme'
import { HEADER_HEIGHT } from '@/shared/config'

export const Header = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      height={`${HEADER_HEIGHT}px`}
      bg={{ base: 'white', _dark: 'brand.800' }}
      borderBottom="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
      boxShadow="sm"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="flex-end"
        px={6}
        gap={4}
      >
        <ThemeSwitcher />
        <UserProfile
          settingsComponent={<UserSettings />}
          logoutComponent={<Logout />}
        />
      </Flex>
    </Box>
  )
}
