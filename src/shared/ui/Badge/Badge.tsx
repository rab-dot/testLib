import { Box, BadgeProps, Flex, Text } from '@chakra-ui/react'

interface CustomBageProps extends BadgeProps {
  fontSize?: string
}

const Badge: React.FC<CustomBageProps> = (props) => {
  const { children, color, fontSize = 'sm', ...rest } = props
  return (
    <Flex>
      <Box
        as="span"
        borderRadius="md"
        position="relative"
        px={2}
        py={0.5}
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bg: color,
          opacity: 0.2,
          borderRadius: 'md',
        }}
        {...rest}
      >
        <Text fontSize={fontSize} color={color}>
          {children}
        </Text>
      </Box>
    </Flex>
  )
}

export default Badge
