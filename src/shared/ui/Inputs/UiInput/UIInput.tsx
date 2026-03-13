import { cn, Input, InputProps } from '@nextui-org/react'
import React from 'react'

export const UIInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
      <Input {...rest} ref={ref} autoComplete="off" className={cn(className)} />
    )
  }
)
