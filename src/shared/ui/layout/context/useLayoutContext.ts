import React from 'react'
import { LayoutContext } from './context'

export const useLayoutContext = () => {
  const context = React.useContext(LayoutContext)
  if (!context) {
    throw new Error('Missing <LayoutProvider>')
  }
  return context
}
