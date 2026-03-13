import { ButtonProps, cn } from '@nextui-org/react'
import { MdClear } from 'react-icons/md'
import { UIButton } from '../UIButton'
import { ConditionalTooltip } from '@/shared/ui'

interface DeleteIconPorps extends ButtonProps {
  isDisabled?: boolean
  btnClassName?: string
}

const DeleteButton: React.FC<DeleteIconPorps> = (props) => {
  const { isDisabled = false, onClick, btnClassName } = props

  const button = (
    <UIButton
      variant="flat"
      className={cn('shadow-md', btnClassName)}
      color="default"
      radius="sm"
      isIconOnly
      data-testid="datetime-reset"
      size="sm"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <MdClear />
    </UIButton>
  )

  return <ConditionalTooltip content="Сбросить">{button}</ConditionalTooltip>
}

export default DeleteButton
