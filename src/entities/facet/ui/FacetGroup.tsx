import React from 'react'
import { Checkbox, Stack, Badge, Box, Text, Flex } from '@chakra-ui/react'
import type { FacetBuckets } from '@/shared/api'

interface FacetGroupProps {
  title: string
  facetData?: FacetBuckets
  selected: string[]
  onChange: (next: string[]) => void
  maxHeight?: number | string
}

export const FacetGroup: React.FC<FacetGroupProps> = ({
  title,
  facetData,
  selected,
  onChange,
  maxHeight,
}) => {
  const entries = React.useMemo(
    () => Object.entries(facetData ?? {}).sort((a, b) => b[1] - a[1]),
    [facetData]
  )

  if (!entries.length) return null

  const handleCheckboxChange = (key: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, key])
    } else {
      onChange(selected.filter((item) => item !== key))
    }
  }

  return (
    <Box>
      {title && (
        <Text
          fontWeight="600"
          mb={3}
          fontSize="sm"
          color={{ base: 'gray.700', _dark: 'gray.200' }}
        >
          {title}
        </Text>
      )}
      <Stack
        gap={2}
        {...(maxHeight ? { maxH: maxHeight, overflowY: 'auto' as const } : {})}
      >
        {entries.map(([key, count]) => (
          <Flex
            key={key}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            px={2}
            py={1}
            borderRadius="md"
            _hover={{ bg: { base: 'gray.50', _dark: 'brand.700' } }}
            cursor="pointer"
          >
            <Checkbox.Root
              checked={selected.includes(key)}
              onCheckedChange={(details: {
                checked: boolean | 'indeterminate'
              }) => handleCheckboxChange(key, details.checked === true)}
              flex={1}
              colorPalette="blue"
              size="sm"
            >
              <Checkbox.HiddenInput />
              {/* @ts-ignore - Chakra UI v3 types issue */}
              <Checkbox.Control
                boxSize={4}
                borderWidth="1px"
                borderRadius="sm"
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                bg={{ base: 'white', _dark: 'brand.800' }}
                cursor="pointer"
              >
                <Checkbox.Indicator
                  color={{ base: 'blue.500', _dark: 'blue.200' }}
                />
              </Checkbox.Control>
              {/* @ts-ignore - Chakra UI v3 types issue */}
              <Checkbox.Label
                title={key}
                fontSize="sm"
                color={{ base: 'gray.700', _dark: 'gray.300' }}
                cursor="pointer"
                ml={2}
              >
                {key}
              </Checkbox.Label>
            </Checkbox.Root>
            <Badge
              variant="subtle"
              ml={2}
              bg={{ base: 'gray.100', _dark: 'brand.700' }}
              color={{ base: 'gray.700', _dark: 'gray.300' }}
              fontSize="xs"
            >
              {count}
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}

export default FacetGroup
