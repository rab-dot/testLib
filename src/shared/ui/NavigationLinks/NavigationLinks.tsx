import { Stack } from '@chakra-ui/react'

interface NavigationLinksProps {
  children: React.ReactNode
}

const NavigationLinks: React.FC<NavigationLinksProps> = (props) => {
  const { children } = props
  return <Stack width="full">{children}</Stack>
}

export default NavigationLinks
