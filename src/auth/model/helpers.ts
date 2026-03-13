export const getAuthToken = (): string | null => {
  const token = window.localStorage.getItem('token') || null
  if (!token) {
    return null
  }
  return JSON.parse(token)
}
