import { Flex } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import React, { useCallback } from 'react'
import { useAuth } from '@/auth/model/hooks'

const Logout = () => {
  const { logout } = useAuth()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <Flex
      alignItems="center"
      _hover={{ bg: { base: 'blackAlpha.50', _dark: 'whiteAlpha.100' } }}
      color={{ base: 'red.500', _dark: 'red.300' }}
      borderRadius="md"
      gap={2}
      cursor="pointer"
      onClick={handleLogout}
      px={3}
      py={1}
    >
      <FiLogOut />
      Выйти
    </Flex>
  )
}

export default Logout
