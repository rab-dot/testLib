import { Flex } from '@chakra-ui/react'
import { NavLink as BaseNavLink } from 'react-router-dom'

interface NavLinkProps {
  path: string
  icon?: React.ReactNode
  title?: string
  isOpen?: boolean
  render?: (path: string) => React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { path, icon, title, isOpen, render } = props

  return (
    <Flex asChild>
      <BaseNavLink to={path}>
        <Flex
          width={isOpen ? '100%' : 'unset'}
          gap={2}
          px={isOpen ? 5 : 2}
          justifyContent={isOpen ? 'flex-start' : 'center'}
        >
          {icon}
          {isOpen ? (render ? render(path) : title) : null}
        </Flex>
      </BaseNavLink>
    </Flex>
  )
}
export default NavLink
