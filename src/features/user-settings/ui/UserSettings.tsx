import { Flex } from '@chakra-ui/react'
import { RiUserSettingsFill } from 'react-icons/ri'
import React from 'react'
import { UserSettingsModal } from './UserSettingsModal'

const UserSettings = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Flex
        alignItems="center"
        _hover={{ bg: 'whiteAlpha.100', color: 'blue.300' }}
        color="brand.600"
        borderRadius="lg"
        gap={4}
        cursor="pointer"
        onClick={() => setIsOpen(true)}
        p={2}
      >
        <RiUserSettingsFill />
        Настройки
      </Flex>
      <UserSettingsModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default UserSettings
