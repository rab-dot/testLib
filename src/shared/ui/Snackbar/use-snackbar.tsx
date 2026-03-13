import { createToaster } from '@chakra-ui/react'
import React from 'react'

interface IError extends Error {
  response: {
    status: string
    statusText: string
    data: {
      message: string
    }
  }
}

export interface UseSnackbarOptions {
  title?: string
  description?: string
  status?: 'info' | 'success' | 'error' | 'loading'
  duration?: number
  isClosable?: boolean
  icon?: React.ReactNode
}

export type SnackbarOptions = UseSnackbarOptions | string

export interface SnackbarPromiseOptions {
  loading?: SnackbarOptions
  success: SnackbarOptions
  error: SnackbarOptions | ((error: any) => SnackbarOptions)
}

const toaster = createToaster({
  placement: 'bottom',
  duration: 5000,
})

export const useSnackbar = (defaultOptions: UseSnackbarOptions = {}) => {
  const parseOptions = React.useCallback(
    (options: SnackbarOptions): UseSnackbarOptions => {
      if (typeof options === 'string') {
        return { title: options }
      }
      return options
    },
    []
  )

  return React.useMemo(() => {
    const snackbar = (options: SnackbarOptions) => {
      const opts = parseOptions(options)
      return toaster.create({
        title: opts.title,
        description: opts.description,
        type: opts.status || 'info',
        duration: opts.duration,
        ...defaultOptions,
        ...opts,
      })
    }

    snackbar.info = (options: SnackbarOptions) => {
      const opts = parseOptions(options)
      return toaster.create({
        ...opts,
        type: 'info',
      })
    }

    snackbar.success = (options: SnackbarOptions) => {
      const opts = parseOptions(options)
      return toaster.create({
        ...opts,
        type: 'success',
      })
    }

    snackbar.error = (options: SnackbarOptions) => {
      const opts = parseOptions(options)
      return toaster.create({
        ...opts,
        type: 'error',
      })
    }

    snackbar.customError = (
      toastId: string,
      error: IError,
      options?: UseSnackbarOptions
    ) => {
      toaster.update(toastId, {
        type: 'error',
        title: 'Ошибка !',
        duration: 8000,
        description: (
          <div className="flex flex-col">
            {error.response.status && (
              <div>
                <span className="text-rose-500 mr-2">Код ошибки:</span>
                <span>{error.response.status}</span>
              </div>
            )}
            {error.response.statusText && (
              <div>
                <span className="text-rose-500 mr-2">
                  Описание кода ошибки:
                </span>
                <span>{error.response.statusText}</span>
              </div>
            )}
            {error.response.data.message && (
              <div>
                <span className="text-rose-500 mr-2">Текст ошибки:</span>
                <span>{error.response.data.message}</span>
              </div>
            )}
          </div>
        ),
        ...options,
      })
    }

    snackbar.customSuccess = (
      toastId: string,
      length: number,
      options?: UseSnackbarOptions
    ) => {
      if (length === 0) {
        toaster.update(toastId, {
          type: 'info',
          description: 'Информации в базе данных не существует',
          ...options,
        })
      } else {
        toaster.update(toastId, {
          type: 'success',
          description: 'Запрос выполен успешно !',
          ...options,
        })
      }
    }

    snackbar.customLoading = (
      toastId: string,
      options?: UseSnackbarOptions
    ) => {
      toaster.update(toastId, {
        type: 'loading',
        description: 'Идёт поиск в базе данных',
        title: 'Загрузка',
        ...options,
      })
    }

    snackbar.update = (toastId: string, options: UseSnackbarOptions) => {
      toaster.update(toastId, {
        title: options.title,
        description: options.description,
        type: options.status,
        duration: options.duration,
        ...options,
      })
    }

    snackbar.closeAll = () => {
      toaster.dismiss()
    }

    snackbar.promise = async <T extends unknown>(
      promise: Promise<T>,
      { loading, success, error }: SnackbarPromiseOptions
    ) => {
      let toastId: string | undefined
      if (loading) {
        const options = parseOptions(loading)
        toastId = toaster.create({
          type: 'loading',
          duration: undefined,
          ...options,
        })
      }
      return promise
        .then((result) => {
          const options: UseSnackbarOptions = {
            status: 'success',
            ...parseOptions(success),
          }
          if (toastId) {
            toaster.update(toastId, {
              type: 'success',
              ...options,
            })
          } else {
            toaster.create({
              type: 'success',
              ...options,
            })
          }
          return result
        })
        .catch((e) => {
          const errorFn = typeof error === 'function' ? error(e) : error
          const options: UseSnackbarOptions = {
            status: 'error',
            description: JSON.stringify(e?.Message),
            title: e?.title,
            ...parseOptions(errorFn),
          }

          if (toastId) {
            toaster.update(toastId, {
              type: 'error',
              ...options,
            })
          } else {
            toaster.create({
              type: 'error',
              ...options,
            })
          }
          throw e
        })
    }

    return snackbar
  }, [parseOptions, defaultOptions])
}
