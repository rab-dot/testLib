import React from 'react'
import { Button, ButtonProps, cn } from '@nextui-org/react'

export const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
      <Button
        size="sm"
        color="primary"
        className={cn(className, 'font-sans text-xs')}
        ref={ref}
        {...rest}
      />
    )
  }
)
