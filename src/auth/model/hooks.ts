import React from 'react'
import { AuthContext } from './context'

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('Missing <AuthProvider>')
  }
  return context
}
