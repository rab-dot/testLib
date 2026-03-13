import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'
import MotionBox from '../../MotionBox/MotionBox'

export const UIIconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>((props, ref) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      width="max-content"
    >
      <IconButton ref={ref} {...props} />
    </MotionBox>
  )
})
