import React from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import LoginForm from '@/auth/ui/LoginForm/LoginForm'
import { useAuth } from '@/auth/model/hooks'
import { appAnimation } from '@/shared/assets'

export const Auth = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const onSuccessHandler = React.useCallback(
    () => navigate('/search'),
    [navigate]
  )

  React.useLayoutEffect(() => {
    if (isAuth) {
      onSuccessHandler()
    }
  }, [isAuth, onSuccessHandler])

  return (
    <div className="flex container relative max-w-full h-screen bg-background">
      <div className="flex flex-col h-full w-full lg:w-1/2">
        <div className="flex flex-col h-full justify-center items-center gap-3">
          <LoginForm />
        </div>
      </div>
      <div className=" hidden lg:block">
        <div className=" flex flex-col items-center h-full justify-center w-full">
          <div className="max-w-3xl">
            <Lottie animationData={appAnimation} />
          </div>
        </div>
      </div>
    </div>
  )
}
