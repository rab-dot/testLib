import React from 'react'
import { Button, HStack, Text, Input } from '@chakra-ui/react'

export interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
}) => {
  const [inputValue, setInputValue] = React.useState(currentPage.toString())

  React.useEffect(() => {
    setInputValue(currentPage.toString())
  }, [currentPage])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '' || /^\d+$/.test(value)) setInputValue(value)
  }

  const handleInputBlur = () => {
    const pageNum = parseInt(inputValue, 10)
    if (Number.isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      setInputValue(currentPage.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
      e.currentTarget.blur()
    }
  }

  return (
    <HStack gap={{ base: 1, sm: 2 }} flexShrink={0}>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        aria-label="Предыдущая"
        borderRadius="md"
        fontWeight="500"
        fontSize={{ base: 'xs', sm: 'sm' }}
        px={{ base: 2, sm: 3 }}
        minWidth={{ base: '28px', sm: 'auto' }}
        h={{ base: '30px', sm: 'auto' }}
        _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
      >
        <Text display={{ base: 'none', md: 'inline' }}>← Назад</Text>
        <Text display={{ base: 'inline', md: 'none' }}>←</Text>
      </Button>

      <HStack gap={1} alignItems="center" flexShrink={0}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          size="sm"
          width={{ base: '36px', sm: '50px' }}
          textAlign="center"
          borderRadius="md"
          fontWeight="600"
          fontSize={{ base: 'xs', sm: 'sm' }}
          h={{ base: '30px', sm: 'auto' }}
          bg={{ base: 'white', _dark: 'gray.700' }}
          borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
          px={1}
          _hover={{ borderColor: { base: 'blue.400', _dark: 'blue.500' } }}
          _focus={{
            borderColor: { base: 'blue.500', _dark: 'blue.400' },
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
          }}
        />
        <Text
          fontSize={{ base: 'xs', sm: 'sm' }}
          color={{ base: 'gray.600', _dark: 'gray.400' }}
          whiteSpace="nowrap"
        >
          / {totalPages}
        </Text>
      </HStack>

      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        aria-label="Следующая"
        borderRadius="md"
        fontWeight="500"
        fontSize={{ base: 'xs', sm: 'sm' }}
        px={{ base: 2, sm: 3 }}
        minWidth={{ base: '28px', sm: 'auto' }}
        h={{ base: '30px', sm: 'auto' }}
        _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
      >
        <Text display={{ base: 'none', md: 'inline' }}>Вперёд →</Text>
        <Text display={{ base: 'inline', md: 'none' }}>→</Text>
      </Button>
    </HStack>
  )
}
