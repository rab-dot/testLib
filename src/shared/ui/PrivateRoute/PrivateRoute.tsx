import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '@/auth/model/hooks'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { children } = props

  const { isAuth } = useAuth()

  if (!isAuth) return <Navigate to="login" replace />

  if (children) return <>{children}</>

  return <Outlet />
}

export default PrivateRoute
