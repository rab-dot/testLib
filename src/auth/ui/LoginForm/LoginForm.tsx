import React from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { useSnackbar } from '@/shared/ui/Snackbar'
import { useAuth } from '@/auth/model/hooks'
import { LoginCredentials } from '@/auth/model'
import { UIInput } from '@/shared/ui/Inputs/UiInput'
import { UIButton } from '@/shared/ui/Buttons/UIButton'
import PasswordInput from '@/shared/ui/PasswordInput/PasswordInput'
import { md5 } from '@/shared/lib'
import { MD5_SALT } from '@/shared/config'
import { getErrorMessage } from '@/shared/api'

const LoginForm = () => {
  const { login, isLoading } = useAuth()

  const snackbar = useSnackbar()
  const snackBarRef = React.useRef<any>(null)
  const {
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      login: '',
      hash: '',
    },
  })

  const onSubmit: SubmitHandler<LoginCredentials> = (
    data: LoginCredentials
  ) => {
    const result = {
      login: data.login,
      hash: md5(data.hash, MD5_SALT),
    }
    snackBarRef.current = snackbar({
      status: 'loading',
      description: 'Проверяем вашу учетную запись',
      title: 'Загрузка',
    })

    login(
      { ...result },
      {
        onSuccess: (user) =>
          snackbar.update(snackBarRef.current, {
            status: 'success',
            description: `${user.name}, добро пожаловать!`,
          }),
        onError: (error) => {
          resetField('hash')
          snackbar.update(snackBarRef.current, {
            status: 'error',
            title: getErrorMessage(error),
            duration: 3_000,
          })
        },
      }
    )
  }

  return (
    <form
      className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 bottom-1/2 h-fit z-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-content1 rounded-lg shadow-lg flex gap-3 justify-center h-full sm:w-[310px] md:w-[450px]">
        <div className="flex flex-col gap-4 p-8 w-full">
          <div>
            <h2 className="text-lg font-medium text-gray.600">Войти</h2>
            <h3 className="text-sm  text-foreground-400">
              Введите свои авторизационные данные
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <Controller
              name="login"
              rules={{
                required: {
                  message: 'Это поле обязательно для заполнения',
                  value: true,
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <UIInput
                    variant="bordered"
                    size="sm"
                    type="text"
                    label="Логин"
                    autoComplete="off"
                    className="focus:outline-none active:outline-none hover:outline-none"
                    {...field}
                  />
                  {error && (
                    <div className="text-xs text-red-500 mt-1">
                      {error?.message}
                    </div>
                  )}
                </div>
              )}
            />
            <Controller
              name="hash"
              control={control}
              rules={{
                required: {
                  message: 'Это поле обязательно для заполнения',
                  value: true,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <PasswordInput {...field} />
                  {error && (
                    <div className="text-xs text-red-500 mt-1">
                      {error?.message}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <UIButton
            isDisabled={!!errors.login || !!errors.hash}
            isLoading={isLoading}
            type="submit"
            className="rounded-md"
            size="md"
          >
            Войти
          </UIButton>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
