import React from 'react'
import { Text, HStack, Badge } from '@chakra-ui/react'

interface ResultsInfoProps {
  totalHits: number
  processingTimeMs: number
}

export const ResultsInfo: React.FC<ResultsInfoProps> = ({
  totalHits,
  processingTimeMs,
}) => {
  return (
    <HStack gap={{ base: 1.5, sm: 2 }} flexShrink={0}>
      <Text
        fontSize={{ base: 'xs', md: 'sm' }}
        color={{ base: 'gray.700', _dark: 'gray.300' }}
        whiteSpace="nowrap"
      >
        Найдено:
      </Text>
      <Badge
        colorPalette="blue"
        variant="subtle"
        fontSize={{ base: 'xs', sm: 'sm' }}
        px={{ base: 2, sm: 2.5 }}
        py={0}
        borderRadius="md"
        fontWeight="600"
      >
        {totalHits.toLocaleString('ru-RU')}
      </Badge>
      <Text
        fontSize="xs"
        color={{ base: 'gray.500', _dark: 'gray.500' }}
        whiteSpace="nowrap"
        display={{ base: 'none', md: 'inline' }}
      >
        ({processingTimeMs} мс)
      </Text>
    </HStack>
  )
}
