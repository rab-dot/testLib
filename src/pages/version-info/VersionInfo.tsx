import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Flex, Heading, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { useTitle } from '@/shared/lib'
import {
  formatActionsType,
  formatVersionHeader,
  getVesionsStrings,
} from './helper'
import { HEADER_HEIGHT } from '@/shared/config'
import { VersionNavigation } from './ui/VersionNavigation'
import { MotionBox } from '@/shared/ui'

export const VersionInfo = () => {
  useTitle('Панель - Version')

  const [state, setState] = React.useState<string>()

  React.useEffect(() => {
    import('../../../CHANGELOG.md')
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then((res) => setState(res))
  }, [])

  const parsedVersions = React.useMemo(() => getVesionsStrings(state), [state])

  return (
    <Flex width="full" minWidth="1000px">
      <AnimatePresence mode="wait">
        <Flex width="100%">
          <VersionNavigation versions={parsedVersions} />
          <Flex width="100%" justifyContent="center">
            <MotionBox
              height={`calc(100vh - ${HEADER_HEIGHT}px)`}
              overflow="auto"
              p={2}
              width="100%"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              position="relative"
            >
              <Stack>
                <Stack width="max-content" justifyContent="center">
                  {state ? (
                    <ReactMarkdown
                      components={{
                        h2: ({ node }: any) => {
                          const header = formatVersionHeader(node)
                          const versionId = header.version
                          return (
                            <Flex
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Heading
                                mt={10}
                                color="accent.yellow"
                                scrollMarginTop={20}
                                id={versionId}
                                size="sm"
                                asChild
                              >
                                <a href={`#${versionId}`}>
                                  Версия v.{versionId}🎉
                                </a>
                              </Heading>
                              <Text mt={10} color="brand.600" fontSize="small">
                                {header.data}
                              </Text>
                            </Flex>
                          )
                        },
                        h3: ({ node, ...props }: any) => {
                          return (
                            <Heading as="h3" my={2} size="xs">
                              {props.children} {formatActionsType(node)}
                            </Heading>
                          )
                        },
                        ul: ({ ...props }: any) => (
                          <Stack
                            gap={1}
                            p={2}
                            bg={{ base: 'brand.200', _dark: 'brand.800' }}
                            fontSize="small"
                            borderRadius="md"
                          >
                            <List.Root>{props.children}</List.Root>
                          </Stack>
                        ),
                        li: ({ node, ...props }: any) => (
                          <ListItem px={2} fontSize="small" color="brand.600">
                            {props.children}
                          </ListItem>
                        ),
                      }}
                    >
                      {state}
                    </ReactMarkdown>
                  ) : null}
                </Stack>
              </Stack>
            </MotionBox>
          </Flex>
        </Flex>
      </AnimatePresence>
    </Flex>
  )
}
