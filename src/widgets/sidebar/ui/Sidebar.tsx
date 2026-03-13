import { motion } from 'framer-motion'
import {
  HEADER_HEIGHT,
  SIDEBAR_WIDTH_IS_CLOSE,
  SIDEBAR_WIDTH_IS_OPEN,
} from '@/shared/config'
import { useLayoutContext } from '@/shared/ui'

type RenderComponentProps = (
  isOpen: boolean,
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>
) => React.ReactNode

interface SidebarProps {
  header?: RenderComponentProps
  content?: RenderComponentProps
  footer?: RenderComponentProps
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { header, content, footer } = props
  const { isSidebarExpanded, setSidebarExpanded } = useLayoutContext()

  return (
    <motion.aside
      hidden={false}
      initial={false}
      animate={{
        width: isSidebarExpanded
          ? SIDEBAR_WIDTH_IS_OPEN
          : SIDEBAR_WIDTH_IS_CLOSE,
      }}
      transition={{ duration: 0.3 }}
      style={{ width: `${SIDEBAR_WIDTH_IS_CLOSE}px` }}
      className="flex flex-col fixed top-0 left-0 bottom-0 z-10 text-ellipsis justify-between flex-initial  bg-content1"
    >
      <div
        id="sidebar-header"
        style={{ height: `${HEADER_HEIGHT}px` }}
        className="flex justify-between relative flex-shrink-0  border-b-1"
      >
        {header && header(isSidebarExpanded, setSidebarExpanded)}
      </div>
      <div
        id="sidebar-content"
        className="h-full flex flex-col items-center justify-center border-r-1"
      >
        {content && content(isSidebarExpanded, setSidebarExpanded)}
      </div>
      <div
        id="sidebar-footer"
        className="flex  border-r-1  h-20 justify-center items-start"
      >
        {footer && footer(isSidebarExpanded, setSidebarExpanded)}
      </div>
    </motion.aside>
  )
}
