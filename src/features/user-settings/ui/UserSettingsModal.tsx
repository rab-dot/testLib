import {
  Button,
  Stack,
  Dialog,
  Portal,
  HStack,
  Text,
  Switch,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@/shared/lib'
import { APP_VERSION } from '@/shared/config'

interface UserSettingsModalProps {
  open: boolean
  onClose: () => void
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = (props) => {
  const { onClose, open } = props
  const [tooltipsEnabled, setTooltipsEnabled] = useLocalStorage(
    'tooltips-enabled',
    true
  )

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e: { open: boolean }) => {
        if (!e.open) {
          onClose()
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Dialog.Positioner>
          {/* @ts-ignore - Chakra UI v3 types issue */}
          <Dialog.Content>
            <Dialog.Header>Настройки пользователя</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Stack gap={6} py={4}>
                <HStack justifyContent="space-between">
                  <Stack gap={0}>
                    <Text fontWeight="medium">Подсказки (Tooltips)</Text>
                    <Text fontSize="xs" color="fg.muted">
                      Включить или выключить всплывающие подсказки в приложении
                    </Text>
                  </Stack>
                  <Switch.Root
                    checked={tooltipsEnabled}
                    onCheckedChange={(details: { checked: boolean }) =>
                      setTooltipsEnabled(details.checked)
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </HStack>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer justifyContent="space-between" alignItems="center">
              <Link
                to={`/version-info#${APP_VERSION}`}
                style={{ fontSize: '12px', fontWeight: 500, opacity: 0.6 }}
                onClick={onClose}
              >
                v.{APP_VERSION}
              </Link>
              <Button onClick={onClose}>Закрыть</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
