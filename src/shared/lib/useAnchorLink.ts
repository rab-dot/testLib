import React from 'react'

export const useAnchorLink = () => {
  const navigateToAnchor = React.useCallback((targetLink: string) => {
    window.location.href = targetLink
  }, [])

  return navigateToAnchor
}
