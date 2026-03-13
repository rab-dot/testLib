import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { ResultsInfo } from './ResultsInfo'
import { LimitSelector } from './LimitSelector'
import { PaginationControls } from './PaginationControls'

export interface ResultsControlsProps {
  totalHits: number
  processingTimeMs: number
  limit: number
  onLimitChange: (newLimit: number) => void
  currentPage: number
  totalPages: number
}

export const ResultsControls: React.FC<ResultsControlsProps> = ({
  totalHits,
  processingTimeMs,
  limit,
  onLimitChange,
  currentPage,
  totalPages,
}) => {
  return (
    <Box
      mt={2}
      p={{ base: 1.5, md: 2 }}
      borderRadius="lg"
      bg={{ base: 'gray.50', _dark: 'brand.700' }}
      border="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
      shadow="sm"
      overflow="hidden"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: 2, md: 4 }}
        minWidth={0}
      >
        <ResultsInfo
          totalHits={totalHits}
          processingTimeMs={processingTimeMs}
        />
        <Flex gap={{ base: 1.5, md: 3 }} alignItems="center" flexShrink={0}>
          <LimitSelector value={limit} onChange={onLimitChange} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Flex>
      </Flex>
    </Box>
  )
}
