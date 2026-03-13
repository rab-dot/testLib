import React, { useState } from 'react'
import {
  Box,
  Button,
  Text,
  Collapsible,
  Flex,
  Icon,
  VStack,
  Badge,
} from '@chakra-ui/react'
import {
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaUndo,
} from 'react-icons/fa'
import { FacetGroup } from '@/entities/facet'
import {
  type FacetBuckets,
  type SearchResult,
  useSearchTopics,
} from '@/shared/api'
import type { FilterState } from '@/features/filters'
import { ConditionalTooltipChakra } from '@/shared/ui'

interface FiltersSidebarProps {
  result?: SearchResult | null
  selected: FilterState
  onChange: (next: FilterState) => void
  onReset: () => void
  hideHeader?: boolean
}

function getFacet(
  result: SearchResult | null | undefined,
  key: string
): FacetBuckets | undefined {
  return result?.facets?.[key]
}

type FacetKey = 'topics' | 'persons' | 'organizations' | 'locations'

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  result,
  selected,
  onChange,
  onReset,
  hideHeader = false,
}) => {
  const { data: topicsData } = useSearchTopics()
  // Маппинг ключей фильтров к ключам в FilterState
  const facetKeyToSelectedKey: Record<FacetKey, keyof FilterState> = {
    topics: 'topics',
    persons: 'persons',
    organizations: 'orgs',
    locations: 'locs',
  }

  const set = (k: keyof FilterState) => (vals: string[]) =>
    onChange({ ...selected, [k]: vals })

  // Состояние для свернутых/развернутых фильтров
  const [expanded, setExpanded] = useState<Record<FacetKey, boolean>>({
    topics: false,
    persons: false,
    organizations: false,
    locations: false,
  })

  const [allExpanded, setAllExpanded] = useState(false)

  const toggleFacet = (facetName: FacetKey) => {
    setExpanded((prev) => ({
      ...prev,
      [facetName]: !prev[facetName],
    }))
  }

  const toggleAll = () => {
    const newState = !allExpanded
    setAllExpanded(newState)
    setExpanded({
      topics: newState,
      persons: newState,
      organizations: newState,
      locations: newState,
    })
  }

  const topicFacetFromResult = getFacet(result, 'topics')
  const topicsFromApi = topicsData?.topics

  const topicsFacetFromApi: FacetBuckets | undefined =
    !topicFacetFromResult && topicsFromApi
      ? Object.fromEntries(topicsFromApi.map((t) => [t, 0]))
      : undefined

  const hasFacets =
    !!topicFacetFromResult ||
    !!topicsFacetFromApi ||
    !!getFacet(result, 'persons') ||
    !!getFacet(result, 'organizations') ||
    !!getFacet(result, 'locations')

  const facetDataMap: Record<FacetKey, FacetBuckets | undefined> = {
    topics: topicFacetFromResult ?? topicsFacetFromApi,
    persons: getFacet(result, 'persons'),
    organizations: getFacet(result, 'organizations'),
    locations: getFacet(result, 'locations'),
  }

  const activeFiltersCount =
    selected.topics.length +
    selected.persons.length +
    selected.orgs.length +
    selected.locs.length

  const facetTitles: Record<FacetKey, string> = {
    topics: 'Темы',
    persons: 'Персоны',
    organizations: 'Организации',
    locations: 'Локации',
  }

  return (
    <Box h="100%">
      <Box
        border={hideHeader ? 'none' : '1px'}
        borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
        borderRadius="md"
        boxShadow={hideHeader ? 'none' : 'sm'}
        mb={4}
        overflow="hidden"
        bg={hideHeader ? 'transparent' : { base: 'white', _dark: 'brand.800' }}
        display="flex"
        flexDirection="column"
      >
        {!hideHeader && (
          <Box
            bg={{ base: 'gray.50', _dark: 'brand.700' }}
            px={4}
            py={3}
            borderBottom="1px"
            borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
            flexShrink={0}
          >
            <Flex justifyContent="space-between" alignItems="center" gap={3}>
              <Flex alignItems="center" gap={2}>
                <Text
                  m={0}
                  fontWeight="600"
                  fontSize="md"
                  color={{ base: 'gray.800', _dark: 'gray.100' }}
                >
                  Фильтры
                </Text>
                {activeFiltersCount > 0 && (
                  <Badge
                    colorPalette="blue"
                    borderRadius="full"
                    bg={{ base: 'blue.100', _dark: 'blue.900' }}
                    color={{ base: 'blue.700', _dark: 'blue.200' }}
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Flex>
              <Flex gap={1}>
                <ConditionalTooltipChakra
                  content={
                    allExpanded
                      ? 'Свернуть все фильтры'
                      : 'Развернуть все фильтры'
                  }
                >
                  <Box
                    aria-label={
                      allExpanded
                        ? 'Свернуть все фильтры'
                        : 'Развернуть все фильтры'
                    }
                    onClick={toggleAll}
                    borderRadius="full"
                    color={{ base: 'gray.600', _dark: 'gray.300' }}
                    _hover={{ bg: { base: 'gray.100', _dark: 'brand.600' } }}
                    padding="6px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                  >
                    <Icon
                      as={allExpanded ? FaChevronUp : FaChevronDown}
                      boxSize={3}
                    />
                  </Box>
                </ConditionalTooltipChakra>

                <ConditionalTooltipChakra content="Сбросить фильтры">
                  <Box
                    aria-label="Сбросить фильтры"
                    onClick={onReset}
                    borderRadius="full"
                    color={{ base: 'gray.600', _dark: 'gray.300' }}
                    _hover={{ bg: { base: 'gray.100', _dark: 'brand.600' } }}
                    padding="6px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                  >
                    <Icon as={FaUndo} boxSize={3} />
                  </Box>
                </ConditionalTooltipChakra>
              </Flex>{' '}
            </Flex>
          </Box>
        )}

        <Box
          p={hideHeader ? 0 : 4}
          flex="1 1 auto"
          overflowY="auto"
          maxH={hideHeader ? 'none' : 'calc(100vh - 200px)'}
        >
          {' '}
          {hasFacets ? (
            <VStack gap={4} align="stretch">
              {(Object.keys(facetDataMap) as FacetKey[]).map((key) => {
                const facetData = facetDataMap[key]
                if (!facetData) return null

                const selectedKey = facetKeyToSelectedKey[key]
                const selectedValues = selected[selectedKey]

                return (
                  <Box key={key}>
                    <Button
                      variant="ghost"
                      size="sm"
                      width="full"
                      justifyContent="space-between"
                      onClick={() => toggleFacet(key)}
                      mb={2}
                      px={2}
                      _hover={{ bg: { base: 'gray.100', _dark: 'brand.600' } }}
                      color={{ base: 'gray.700', _dark: 'gray.200' }}
                    >
                      <Flex alignItems="center" gap={2}>
                        <Text fontWeight="medium" fontSize="sm">
                          {facetTitles[key]}
                        </Text>
                        <Box
                          bg={{ base: 'gray.200', _dark: 'brand.600' }}
                          color={{ base: 'gray.700', _dark: 'gray.300' }}
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="medium"
                        >
                          {Object.keys(facetData).length}
                        </Box>
                      </Flex>
                      <Icon
                        as={expanded[key] ? FaChevronDown : FaChevronRight}
                        boxSize={3}
                      />
                    </Button>

                    <Collapsible.Root open={expanded[key]}>
                      {/* @ts-ignore - Chakra UI v3 types issue */}
                      <Collapsible.Content>
                        <Box pl={1} mb={2}>
                          <FacetGroup
                            title=""
                            facetData={facetData}
                            selected={selectedValues}
                            onChange={set(selectedKey)}
                          />
                        </Box>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </Box>
                )
              })}
            </VStack>
          ) : (
            <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
              Выполните поиск, чтобы увидеть фильтры
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default FiltersSidebar
