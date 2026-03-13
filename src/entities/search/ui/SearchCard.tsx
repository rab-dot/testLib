import React from 'react'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { Badge, Box, Link as ChakraLink, Text } from '@chakra-ui/react'
import type { SearchDocument } from '@/shared/api'

interface SearchCardProps {
  doc: SearchDocument
}

export const SearchCard: React.FC<SearchCardProps> = ({ doc }) => {
  const snippet =
    doc.text.length > 300 ? `${doc.text.slice(0, 300)}...` : doc.text

  return (
    <Card className="shadow-sm hover:-translate-y-0.5 transition-transform duration-200 mb-3">
      <CardHeader>
        <ChakraLink
          href="#"
          color={{ base: 'blue.600', _dark: 'blue.400' }}
          fontWeight="600"
          fontSize="md"
          _hover={{ textDecoration: 'underline' }}
        >
          {doc.documentId}
        </ChakraLink>
      </CardHeader>
      <Divider />
      <CardBody>
        <Box mb={2} display="flex" flexWrap="wrap" gap="6px">
          {(doc.topics ?? []).slice(0, 3).map((t) => (
            <Badge key={`t-${t}`} colorPalette="blue">
              {t}
            </Badge>
          ))}
          {(doc.persons ?? []).slice(0, 3).map((p) => (
            <Badge key={`p-${p}`} colorPalette="green">
              👤 {p}
            </Badge>
          ))}
          {(doc.organizations ?? []).slice(0, 3).map((o) => (
            <Badge key={`o-${o}`} colorPalette="yellow">
              🏢 {o}
            </Badge>
          ))}
        </Box>

        <Text
          color={{ base: 'gray.700', _dark: 'gray.300' }}
          mb={2}
          fontSize="sm"
          lineHeight="1.6"
        >
          {snippet}
        </Text>

        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="xs">
          📄 {doc.fileType}
          {doc.lastModified && (
            <> | 📅 {new Date(doc.lastModified).toLocaleDateString()}</>
          )}
        </Text>
      </CardBody>
    </Card>
  )
}

export default SearchCard
