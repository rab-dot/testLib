import { List, Popover, Portal } from '@chakra-ui/react'
import React from 'react'

interface UserDropdownProps {
  trigger: React.ReactNode
  renderItems: () => React.ReactNode
}

const UserDropdown: React.FC<UserDropdownProps> = (props) => {
  const { trigger, renderItems } = props
  return (
    <Popover.Root>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Popover.Trigger>{trigger || null}</Popover.Trigger>
      <Portal>
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Popover.Positioner>
          {/* @ts-ignore - Chakra UI v3 types issue */}
          <Popover.Content width="max-content" p={1}>
            <Popover.Body boxShadow="xl" p={0}>
              <List.Root gap={1} p={0}>
                {renderItems()}
              </List.Root>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default UserDropdown
