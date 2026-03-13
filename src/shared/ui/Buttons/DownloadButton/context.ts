import React from 'react'
import { OptionItem } from './types'

type DownloadButtonContext = {
  options: OptionItem[]
  selectedOption: string
  onSlectOption: React.Dispatch<React.SetStateAction<string>>
}

export const DownloadButtonContext = React.createContext(
  {} as DownloadButtonContext
)
export const useDownloadButton = () => {
  const context = React.useContext(DownloadButtonContext)
  if (!context) {
    throw new Error(
      'useDownloadButton should been used inside Download provider'
    )
  }
  return context
}
