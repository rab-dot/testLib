import React from 'react'
import { Box, Spinner, Flex } from '@chakra-ui/react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { SearchResult } from '@/shared/api'
import { SearchCard } from '@/entities/search'
import { ResultsControls } from './ResultsControls'
import { calculatePagination } from '../lib/pagination'

interface SearchResultsProps {
  result?: SearchResult | null
  isLoading?: boolean
  limit: number
  onLimitChange: (newLimit: number) => void
}

const ESTIMATED_CARD_HEIGHT = 180

export const SearchResults: React.FC<SearchResultsProps> = ({
  result,
  isLoading,
  limit,
  onLimitChange,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const hits = result?.hits ?? []

  const virtualizer = useVirtualizer({
    count: hits.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_CARD_HEIGHT,
    overscan: 5,
  })

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" py={10}>
        <Spinner size="lg" color="blue.500" />
      </Flex>
    )
  }

  if (!result) return null

  const { currentPage, totalPages } = calculatePagination(
    result.totalHits,
    limit
  )

  return (
    <Box pb={8}>
      <Box ref={parentRef} overflow="auto" maxH="calc(100vh - 220px)" pr={2}>
        <Box
          position="relative"
          width="100%"
          height={`${virtualizer.getTotalSize()}px`}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const hit = hits[virtualRow.index]
            return (
              <Box
                key={hit.id ?? `${hit.documentId}-${hit.chunkId}`}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                transform={`translateY(${virtualRow.start}px)`}
              >
                <SearchCard doc={hit} />
              </Box>
            )
          })}
        </Box>
      </Box>

      {result.totalHits > 0 && (
        <ResultsControls
          totalHits={result.totalHits}
          processingTimeMs={result.processingTimeMs}
          limit={limit}
          onLimitChange={onLimitChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </Box>
  )
}

export default SearchResults
