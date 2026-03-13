import React from 'react'
import {
  HEADER_HEIGHT,
  SIDEBAR_WIDTH_IS_CLOSE,
  SIDEBAR_WIDTH_IS_OPEN,
} from '@/shared/config'
import { useLocalStorage } from '@/shared/lib'
import { LayoutContext } from './context'

interface LayoutProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { header, sidebar, footer, children } = props
  const [isExpanded, setIsExpanded] = useLocalStorage(
    'sidebar-is-expand',
    false
  )

  const layoutValue = React.useMemo(
    () => ({
      isSidebarExpanded: isExpanded,
      setSidebarExpanded: setIsExpanded,
    }),
    [isExpanded, setIsExpanded]
  )

  const CONTENT_MARGIN = `${
    sidebar
      ? isExpanded
        ? SIDEBAR_WIDTH_IS_OPEN
        : SIDEBAR_WIDTH_IS_CLOSE
      : '0'
  }px`

  const CONTENT_MARGIN_TOP = `${header ? HEADER_HEIGHT : '0'}px`
  const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT}px)`

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="bg-background flex h-full ">
        {header && header}
        {sidebar && sidebar}

        <main
          className="flex flex-col flex-initial transition-all"
          style={{
            minHeight: CONTAINER_HEIGHT,
            marginLeft: CONTENT_MARGIN,
            marginTop: CONTENT_MARGIN_TOP,
          }}
        >
          <div
            style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
            className="flex flex-col  transition-all"
          >
            {children}
          </div>
        </main>

        {footer && footer}
      </div>
    </LayoutContext.Provider>
  )
}

export default React.memo(Layout)
