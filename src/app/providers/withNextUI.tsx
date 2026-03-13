import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { AnimateLoader } from '@/shared/assets'

export const withNextUI = (component: () => React.ReactNode) =>
  function render() {
    return (
      <NextUIProvider>
        <React.Suspense fallback={<AnimateLoader />}>
          {component()}
        </React.Suspense>
      </NextUIProvider>
    )
  }
