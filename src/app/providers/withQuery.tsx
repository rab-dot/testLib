import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AnimateLoader } from '@/shared/assets'
import { __DEBUG__ } from '@/shared/config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      notifyOnChangeProps: 'all',
    },
  },
})

export const withQuery = (component: () => React.ReactNode) =>
  function render() {
    return (
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<AnimateLoader />}>
          {component()}
        </React.Suspense>
        {__DEBUG__ ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    )
  }
