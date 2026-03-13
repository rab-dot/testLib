import { Heading } from '@chakra-ui/react'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AnimateLoader } from '@/shared/assets'
import { PrivateRoute } from '@/shared/ui/PrivateRoute'
import { ErrorFallback } from '@/shared/ui/ErrorFallback'

const MainPage = React.lazy(() => import('./main'))
const VersionInfoPage = React.lazy(() => import('./version-info'))
const AuthPage = React.lazy(() => import('./auth'))
const SearchPage = React.lazy(() => import('./search'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <React.Suspense fallback={<AnimateLoader />}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MainPage />
          </ErrorBoundary>
        </React.Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<AnimateLoader />}>
            <SearchPage />
          </React.Suspense>
        ),
        errorElement: <Heading>Error !</Heading>,
      },
      {
        path: 'version-info',
        element: (
          <React.Suspense fallback={<AnimateLoader />}>
            <VersionInfoPage />
          </React.Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <React.Suspense fallback={<AnimateLoader />}>
            <SearchPage />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <Heading>Not Found</Heading>,
  },
])
