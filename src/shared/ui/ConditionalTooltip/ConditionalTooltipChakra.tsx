import React from 'react'
import { Tooltip } from '@chakra-ui/react'
import { useLocalStorage } from '../../lib'

interface ConditionalTooltipChakraProps {
  content: string
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

export const ConditionalTooltipChakra: React.FC<
  ConditionalTooltipChakraProps
> = ({ content, children, placement = 'top', disabled = false }) => {
  const [tooltipsEnabled] = useLocalStorage('tooltips-enabled', true)

  if (!tooltipsEnabled || disabled) {
    return children
  }

  return (
    <Tooltip.Root positioning={{ placement }}>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Tooltip.Positioner>
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Tooltip.Content>{content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
