import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimateLoader } from '@/shared/assets'
import { ColorModeProvider } from '@/shared/ui/ColorMode'
import theme from '@/shared/theme'

export const withChakra = (component: () => React.ReactNode) =>
  function render() {
    return (
      <ChakraProvider value={theme}>
        <ColorModeProvider>
          <React.Suspense fallback={<AnimateLoader />}>
            {component()}
          </React.Suspense>
        </ColorModeProvider>
      </ChakraProvider>
    )
  }
