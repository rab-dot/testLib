import React from 'react'

interface LayoutContextOptions {
  isSidebarExpanded: boolean
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
export const LayoutContext = React.createContext({} as LayoutContextOptions)
