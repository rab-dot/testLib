import axios, { InternalAxiosRequestConfig } from 'axios'
import { API_HOST, IS_MOCK, MOCK_API_HOST } from '../config'
import { getAuthToken } from '@/auth/model'

// Общий клиент:
// - в мок-режиме указывает на MOCK_API_HOST
// - в боевом режиме указывает на API_HOST
// Используется, в первую очередь, для авторизации и прочих служебных вызовов.
const defaultBaseURL = IS_MOCK ? MOCK_API_HOST : API_HOST

export const api = axios.create({
  baseURL: defaultBaseURL,
})

// Клиент поиска:
// - всегда ходит на реальный backend по API_HOST
// - использует тот же токен, что и основной клиент
export const searchApi = axios.create({
  baseURL: API_HOST,
})

const attachAuthToken = (config: InternalAxiosRequestConfig) => {
  const axiosConfig = config
  const token = getAuthToken()
  if (!token) return config
  axiosConfig.headers['Token'] = token
  return axiosConfig
}

api.interceptors.request.use(attachAuthToken)
searchApi.interceptors.request.use(attachAuthToken)
