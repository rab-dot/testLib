import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import { OptionItem } from './types'

interface DownloadOptionsPopoverItemProps {
  handleClick: (item: string) => void
  selectedItem: string
  items: OptionItem[]
}
export const DownloadOptionsPopoverItem: React.FC<
  DownloadOptionsPopoverItemProps
> = (props) => {
  const { handleClick, items, selectedItem } = props

  return (
    <>
      {items.map((item) => {
        const isSelectedItem = item.title === selectedItem
        return (
          <Box
            key={item.id}
            onClick={() => handleClick(item.title)}
            p={2}
            borderRadius="md"
            bg="gray.50"
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            _dark={{
              bg: 'gray.900',
              color: 'gray.300',
              _hover: { bg: 'gray.800' },
            }}
          >
            <Flex justifyContent="space-between">
              <Text
                fontSize="sm"
                color={isSelectedItem ? 'green.500' : 'gray.500'}
                _dark={{
                  color: `${isSelectedItem ? 'green.300' : 'gray.500'}`,
                }}
                fontWeight="semibold"
              >
                {item.title}
              </Text>
              {item.label ? (
                <Badge colorPalette="green" fontSize="xs">
                  {item.label}
                </Badge>
              ) : null}
            </Flex>
          </Box>
        )
      })}
    </>
  )
}
