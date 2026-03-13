import React from 'react'
import { AuthProvider } from '@/auth/model/context'
import { AnimateLoader } from '@/shared/assets'

export const withAuth = (component: () => React.ReactNode) =>
  function render() {
    return (
      <AuthProvider>
        <React.Suspense fallback={<AnimateLoader />}>
          {component()}
        </React.Suspense>
      </AuthProvider>
    )
  }
