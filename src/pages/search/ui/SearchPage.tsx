import React from 'react'
import { Box, Container, Grid, GridItem, HStack } from '@chakra-ui/react'
import { SearchResults } from '@/widgets/search-results'
import { useSearchDocuments } from '@/shared/api'
import type { FilterState } from '@/features/filters'
import { SearchBar } from '@/widgets/search-bar'
import { FiltersSidebar, MobileFiltersDrawer } from '@/widgets/filters-sidebar'

const initialFilters: FilterState = {
  topics: [],
  persons: [],
  orgs: [],
  locs: [],
}

export const SearchPage: React.FC = () => {
  const [appliedQuery, setAppliedQuery] = React.useState('')
  const [filters, setFilters] = React.useState<FilterState>(initialFilters)
  const [limit, setLimit] = React.useState<number>(25)

  const searchParams = React.useMemo(() => {
    const normalizedQuery = appliedQuery.trim()

    return {
      q: normalizedQuery === '' ? undefined : normalizedQuery,
      topics: filters.topics,
      persons: filters.persons,
      orgs: filters.orgs,
      locs: filters.locs,
      limit,
    }
  }, [appliedQuery, filters, limit])

  const { data: result, isLoading } = useSearchDocuments(searchParams)

  const handleSubmitSearch = React.useCallback((query: string) => {
    setAppliedQuery(query)
  }, [])

  const handleLimitChange = React.useCallback((newLimit: number) => {
    setLimit(newLimit)
  }, [])

  const onReset = () => {
    setFilters(initialFilters)
    setAppliedQuery('')
  }

  return (
    <Container maxW="container.xl" pt={4} pb={12} px={2}>
      <Grid templateColumns={{ base: '1fr', '2lg': '350px 1fr' }} gap={4}>
        {/* Desktop: Show filters sidebar in left column */}
        <Box hideBelow="2lg">
          <GridItem>
            <FiltersSidebar
              result={result}
              selected={filters}
              onChange={setFilters}
              onReset={onReset}
            />
          </GridItem>
        </Box>

        {/* Main content area */}
        <GridItem>
          <Box>
            {/* Mobile: Show filter button alongside search bar */}
            <Box hideFrom="2lg">
              <HStack gap={3} mb={4} align="flex-start">
                <MobileFiltersDrawer
                  result={result}
                  selected={filters}
                  onChange={setFilters}
                  onReset={onReset}
                />
                <Box flex={1}>
                  <SearchBar
                    onSubmit={handleSubmitSearch}
                    onClear={onReset}
                    isLoading={isLoading}
                  />
                </Box>
              </HStack>
            </Box>

            {/* Desktop: Show search bar normally */}
            <Box hideBelow="2lg">
              <Box mb={4}>
                <SearchBar
                  onSubmit={handleSubmitSearch}
                  onClear={onReset}
                  isLoading={isLoading}
                />
              </Box>
            </Box>

            <SearchResults
              result={result}
              isLoading={isLoading}
              limit={limit}
              onLimitChange={handleLimitChange}
            />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default SearchPage
