import React from 'react'
import { Input, Button, Flex, IconButton } from '@chakra-ui/react'
import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBarProps {
  onSubmit: (query: string) => void
  onClear?: () => void
  isLoading?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSubmit,
  onClear,
  isLoading,
}) => {
  const [value, setValue] = React.useState('')

  const handleSubmit = () => {
    onSubmit(value)
  }

  const handleClear = () => {
    setValue('')
    onClear?.()
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <Flex
      gap={2}
      alignItems="center"
      boxShadow="sm"
      borderRadius="md"
      border="1px"
      borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
      bg={{ base: 'white', _dark: 'brand.800' }}
      p={1}
    >
      <Flex
        alignItems="center"
        pl={2}
        color={{ base: 'gray.500', _dark: 'gray.400' }}
      >
        <FiSearch aria-hidden="true" />
      </Flex>
      <Input
        placeholder="Введите запрос..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Search"
        border="none"
        _focus={{ boxShadow: 'none', outline: 'none' }}
        _focusVisible={{ boxShadow: 'none', outline: 'none' }}
        bg="transparent"
        flex={1}
        color={{ base: 'gray.900', _dark: 'gray.100' }}
      />
      {value && (
        <IconButton
          aria-label="Очистить поиск"
          size="sm"
          variant="ghost"
          onClick={handleClear}
          disabled={isLoading}
          color={{ base: 'gray.600', _dark: 'gray.400' }}
          _hover={{ bg: { base: 'gray.100', _dark: 'brand.700' } }}
        >
          <FiX />
        </IconButton>
      )}
      <Button
        colorPalette="blue"
        size="sm"
        onClick={handleSubmit}
        loading={isLoading}
        bg={{ base: 'blue.500', _dark: 'blue.600' }}
        color="white"
        _hover={{ bg: { base: 'blue.600', _dark: 'blue.700' } }}
        px={4}
        borderRadius="md"
      >
        Поиск
      </Button>
    </Flex>
  )
}

export default SearchBar
