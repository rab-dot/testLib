import { User } from './types'

export const getCurrentUser = () => {
  return JSON.parse(window.localStorage.getItem('user') || '') as User
}

export const getCurrentUserPermissions = () => {
  const user = getCurrentUser()
  if (!user) return undefined
  return user.permissions
}

export const getCurrentUserToken = () => {
  const user = getCurrentUser()
  if (!user) return undefined
  return user.token
}
