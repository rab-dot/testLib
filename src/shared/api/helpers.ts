import axios, { AxiosError } from 'axios'
import { ApiErrorMessage } from './types'

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw error
  }
  throw new Error('Unknown Error!')
}

export const getErrorMessage = (error: AxiosError<ApiErrorMessage>) => {
  return error.response?.data.Message || error.message
}
