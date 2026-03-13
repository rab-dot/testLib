import React from 'react'
import { Tooltip } from '@nextui-org/react'
import { useLocalStorage } from '../../lib'

interface ConditionalTooltipProps {
  content: string
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

export const ConditionalTooltip: React.FC<ConditionalTooltipProps> = ({
  content,
  children,
  placement = 'top',
  disabled = false,
}) => {
  const [tooltipsEnabled] = useLocalStorage('tooltips-enabled', true)

  if (!tooltipsEnabled || disabled) {
    return children
  }

  return (
    <Tooltip content={content} placement={placement}>
      {children}
    </Tooltip>
  )
}
