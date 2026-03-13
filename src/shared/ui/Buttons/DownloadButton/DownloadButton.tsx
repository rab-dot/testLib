import React from 'react'
import { Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { DownloadButtonContext } from './context'
import { DownloadOptionsPopover } from './DownloadOptionsPopover'

import { OptionItem } from './types'

interface DownloadButtonPorps {
  onSave: () => void
  options: OptionItem[]
  selectedOption: string
  onOptionSelect: React.Dispatch<React.SetStateAction<string>>
}

export const DownloadButton: React.FC<DownloadButtonPorps> = (props) => {
  const { onSave, options, selectedOption, onOptionSelect } = props

  const context = React.useMemo(
    () => ({ options, onSlectOption: onOptionSelect, selectedOption }),
    [onOptionSelect, options, selectedOption]
  )
  return (
    <ButtonGroup attached>
      <Button
        size="sm"
        color={{ base: 'green.600', _dark: 'green.400' }}
        variant="outline"
        onClick={onSave}
      >
        <Icon color={{ base: 'green.600', _dark: 'green.400' }} mr={2}>
          <HiOutlineDocumentDownload />
        </Icon>
        Скачать
      </Button>
      <DownloadButtonContext.Provider value={context}>
        <DownloadOptionsPopover />
      </DownloadButtonContext.Provider>
    </ButtonGroup>
  )
}
