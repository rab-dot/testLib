import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ROUTES } from '@/shared/config'
import { User } from '@/entities/user'
import { LoginCredentials } from './types'
import { api, ApiErrorMessage, errorHandler } from '@/shared/api'

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const res = await api.post(ROUTES.login, { ...credentials })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const useLogin = () =>
  useMutation({
    mutationKey: [''],
    mutationFn: login,
    onError: (error: AxiosError<ApiErrorMessage>) => error,
  })
