import React from 'react'
import { NativeSelect, HStack, Text } from '@chakra-ui/react'

interface LimitSelectorProps {
  value: number
  onChange: (newLimit: number) => void
}

const LIMIT_OPTIONS = [10, 25, 50, 100]

export const LimitSelector: React.FC<LimitSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <HStack gap={{ base: 1, sm: 2 }} flexShrink={0}>
      <Text
        fontSize={{ base: 'xs', md: 'sm' }}
        color={{ base: 'gray.700', _dark: 'gray.300' }}
        whiteSpace="nowrap"
        display={{ base: 'none', sm: 'inline' }}
      >
        Показывать:
      </Text>
      <NativeSelect.Root
        size="sm"
        width="auto"
        minWidth={{ base: '56px', sm: '70px' }}
        maxWidth={{ base: '70px', sm: '80px' }}
        variant="outline"
      >
        <NativeSelect.Field
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          borderRadius="md"
          fontWeight="500"
          fontSize={{ base: 'xs', sm: 'sm' }}
          bg={{ base: 'white', _dark: 'gray.700' }}
          cursor="pointer"
          transition="all 0.2s"
          px={{ base: 1, sm: 2 }}
          _hover={{
            borderColor: { base: 'blue.400', _dark: 'blue.500' },
            bg: { base: 'blue.50', _dark: 'gray.600' },
          }}
          _focus={{
            borderColor: { base: 'blue.500', _dark: 'blue.400' },
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
          }}
        >
          {LIMIT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </HStack>
  )
}
