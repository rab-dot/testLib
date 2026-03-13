import React from 'react'
import { Popover, Text, Stack, Button } from '@chakra-ui/react'

import { useDownloadButton } from './context'

import { DownloadOptionsPopoverItem } from './DownloadOptionsPopoverItem'

export const DownloadOptionsPopover = () => {
  const { onSlectOption, options, selectedOption } = useDownloadButton()

  const [isOpen, setIsOpen] = React.useState(false)

  const handleOnSelect = (value: string) => {
    onSlectOption?.(value)
    setIsOpen(false)
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(e: { open: boolean }) => setIsOpen(e.open)}
    >
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Popover.Trigger>
        <Button
          variant="outline"
          color={{ base: 'green.600', _dark: 'green.400' }}
          size="sm"
        >
          +
        </Button>
      </Popover.Trigger>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Popover.Positioner>
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Popover.Content boxShadow="lg" width="250px">
          {/* @ts-ignore - Chakra UI v3 types issue */}
          <Popover.Header>
            <Text fontSize="sm">Выберите формат</Text>
          </Popover.Header>
          <Popover.CloseTrigger />
          <Popover.Body>
            <Stack>
              <DownloadOptionsPopoverItem
                handleClick={handleOnSelect}
                selectedItem={selectedOption}
                items={options}
              />
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
