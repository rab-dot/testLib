import { InputProps } from '@nextui-org/react'
import React, { ForwardedRef } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { UIInput } from '../Inputs/UiInput'

type PasswordInputProps = Omit<InputProps, 'ref'>

const PasswordInput = React.forwardRef(
  (props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { ...rest } = props
    const [isVisible, setIsVisible] = React.useState(false)
    const onChangeVisible = React.useCallback(
      () => setIsVisible((prev) => !prev),
      []
    )
    return (
      <UIInput
        {...rest}
        ref={ref}
        label="Пароль"
        size="sm"
        variant="bordered"
        type={isVisible ? 'text' : 'password'}
        isClearable
        endContent={
          <button
            type="button"
            onClick={onChangeVisible}
            className="focus:outline-none"
            aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        }
      />
    )
  }
)

export default PasswordInput
