import React from 'react'
import {
  Drawer,
  IconButton,
  Badge,
  HStack,
  Text,
  Button,
} from '@chakra-ui/react'
import { FiFilter, FiX, FiRotateCcw } from 'react-icons/fi'
import type { SearchResult } from '@/shared/api'
import type { FilterState } from '@/features/filters'
import FiltersSidebar from './FiltersSidebar'

interface MobileFiltersDrawerProps {
  result?: SearchResult | null
  selected: FilterState
  onChange: (next: FilterState) => void
  onReset: () => void
}

export const MobileFiltersDrawer: React.FC<MobileFiltersDrawerProps> = ({
  result,
  selected,
  onChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  // Count active filters
  const activeFiltersCount =
    selected.topics.length +
    selected.persons.length +
    selected.orgs.length +
    selected.locs.length

  return (
    <>
      <IconButton
        aria-label="Открыть фильтры"
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="md"
      >
        <HStack gap={1}>
          <FiFilter />
          {activeFiltersCount > 0 && (
            <Badge
              colorPalette="blue"
              borderRadius="full"
              fontSize="xs"
              minW="18px"
              textAlign="center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </HStack>
      </IconButton>
      <Drawer.Root
        open={isOpen}
        onOpenChange={(details: { open: boolean }) => setIsOpen(details.open)}
        placement="start"
        size="sm"
      >
        <Drawer.Backdrop />
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Drawer.Positioner>
          {/* @ts-ignore - Chakra UI v3 types issue */}
          <Drawer.Content bg={{ base: 'white', _dark: 'brand.900' }}>
            {' '}
            <Drawer.Header
              borderBottomWidth="1px"
              px={4}
              py={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack gap={3}>
                <Text fontSize="lg" fontWeight="bold">
                  Фильтры
                </Text>
                {activeFiltersCount > 0 && (
                  <Badge
                    colorPalette="blue"
                    variant="solid"
                    borderRadius="full"
                    px={2}
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </HStack>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть"
              >
                <FiX />
              </IconButton>
            </Drawer.Header>
            <Drawer.Body px={4} py={6} overflowY="auto">
              <FiltersSidebar
                result={result}
                selected={selected}
                onChange={onChange}
                onReset={() => {
                  onReset()
                  setIsOpen(false)
                }}
                hideHeader
              />
            </Drawer.Body>
            <Drawer.Footer
              borderTopWidth="1px"
              p={4}
              bg={{ base: 'gray.50', _dark: 'brand.800' }}
            >
              <HStack width="full" gap={3}>
                <Button
                  variant="outline"
                  flex={1}
                  onClick={onReset}
                  disabled={activeFiltersCount === 0}
                >
                  <FiRotateCcw /> Сбросить
                </Button>
                <Button
                  colorPalette="blue"
                  flex={2}
                  onClick={() => setIsOpen(false)}
                >
                  Показать результаты
                </Button>
              </HStack>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}

export default MobileFiltersDrawer
