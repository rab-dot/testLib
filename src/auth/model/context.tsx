import React from 'react'
import { AxiosError } from 'axios'
import { LoginCredentials } from './types'
import { ApiErrorMessage } from '@/shared/api'
import { User } from '@/entities/user'
import { useLocalStorage } from '@/shared/lib'
import { useLogin } from './api'

interface AuthContext {
  isAuth: boolean
  user: User | null
  isLoading: boolean
  isError: boolean

  login: (credentials: LoginCredentials, options?: LoginOptions) => void
  logout: (callback?: (...args: any[]) => void) => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface LoginOptions {
  onSuccess?: (user: User) => void
  onError?: (error: AxiosError<ApiErrorMessage>) => void
  onFinaly?: (user?: User, error?: unknown) => void
}

export const AuthContext = React.createContext({} as AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props

  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const [, setToken] = useLocalStorage<string | null>('token', null)
  const [isError, setIsError] = React.useState(false)
  const { mutateAsync, isPending: isLoading } = useLogin()

  const login = React.useCallback(
    (credentials: LoginCredentials, options?: LoginOptions) => {
      mutateAsync(credentials, {
        onSuccess: async (data) => {
          setUser(data)
          setToken(data.token)
          setIsError(false)
          options?.onSuccess?.(data)
        },
        onError: async (error) => {
          setIsError(true)
          setUser(null)
          setToken(null)
          options?.onError?.(error)
        },
      })
    },
    [mutateAsync, setToken, setUser]
  )

  const logout = React.useCallback(
    (callback?: (...args: any[]) => void) => {
      window.localStorage.removeItem('token')
      callback?.()
      return setUser(null)
    },
    [setUser]
  )

  const context = React.useMemo(
    () => ({
      isAuth: !!user,
      login,
      logout,
      isLoading,
      isError,
      user,
    }),
    [user, isError, isLoading, login, logout]
  )

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
