import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useAnchorLink } from '@/shared/lib'
import { getVersionAnchor } from '../helper'
import { Badge } from '@/shared/ui/Badge'
import { MotionBox } from '@/shared/ui/MotionBox'
import { NavLink, UIButton } from '@/shared/ui'
import { HEADER_HEIGHT } from '@/shared/config'

interface VersionNavigationProps {
  versions: { versionNumber: string; versionDate: string }[]
}

export const VersionNavigation: React.FC<VersionNavigationProps> = (props) => {
  const { versions } = props

  const { hash } = useLocation()
  const navigateToAnchor = useAnchorLink()

  return (
    <Flex position="relative" height="max-content" width="50%">
      <MotionBox
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100px', opacity: 0 }}
        style={{
          position: 'fixed',
          top: `${HEADER_HEIGHT + 10}px`,
          left: '0px',
          zIndex: 10,
        }}
      >
        <NavLink
          path="/"
          title="на главную"
          isOpen
          render={() => (
            <UIButton
              variant="ghost"
              color="primary"
              className="flex justify-start pl-0"
              startContent={<IoArrowBack size={18} />}
            >
              на главную
            </UIButton>
          )}
        />
      </MotionBox>
      <MotionBox
        initial={{ x: '-500px' }}
        animate={{ x: 0 }}
        exit={{ x: '-500px' }}
      >
        <Stack ml="20" mt="14" gap={4}>
          <Box
            boxShadow="none"
            p="5"
            maxHeight={`calc(100vh - ${HEADER_HEIGHT + 90}px)`}
            overflowY="auto"
            borderRadius="md"
            border="1px"
            borderColor={{ base: 'gray.200', _dark: 'brand.700' }}
            bg={{ base: 'brand.200', _dark: 'brand.800' }}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'accent.blue',
                borderRadius: '24px',
              },
            }}
          >
            <Box mb={4}>
              <Text fontWeight="semibold">Навигация по версиям:</Text>
            </Box>
            <Box>
              <Stack
                position="relative"
                height="100%"
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  borderRadius: 'md',
                  height: '100%',
                  bg: 'blackAlpha.400',
                }}
              >
                {versions?.map((item, index) => {
                  const isActive = hash === getVersionAnchor(item.versionNumber)
                  const isActivePointColor = isActive
                    ? 'accent.blue'
                    : 'blackAlpha.400'
                  const isActiveVersionBadgeColor = isActive
                    ? 'accent.blue'
                    : 'transparent'
                  const isLastElement = !index
                  return (
                    <Flex
                      key={item.versionNumber}
                      cursor="pointer"
                      gap={5}
                      justifyContent="space-between"
                      onClick={() =>
                        navigateToAnchor(getVersionAnchor(item.versionNumber))
                      }
                      width="100%"
                      pt={2}
                      pl={5}
                    >
                      <Box
                        position="relative"
                        data-version={item.versionNumber}
                        transition="all 0.5s"
                        _after={{
                          content: '""',
                          position: 'absolute',
                          zIndex: 1,
                          width: '8px',
                          height: '8px',
                          borderRadius: 'full',
                          bg: isActivePointColor,
                          left: '-23px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          transition: 'all 0.5s',
                          boxShadow: 'md',
                        }}
                        _before={{
                          content: '""',
                          position: 'absolute',
                          width: '8px',
                          height: '100%',
                          bg: isActiveVersionBadgeColor,
                          top: '0',
                          left: '-8px',
                          clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                          transition: 'all 0.5s',
                          boxShadow: 'md',
                        }}
                        bg={isActive ? 'accent.blue' : 'transparent'}
                        borderEndRadius="sm"
                      >
                        <Text px="2">{item.versionNumber}</Text>
                      </Box>
                      <Text fontSize="sm" textAlign="center" color="brand.600">
                        {item.versionDate}
                      </Text>

                      <Box position="absolute" left="-90px">
                        {isLastElement ? (
                          <Badge boxShadow="md" color="accent.green">
                            Latest
                          </Badge>
                        ) : null}
                      </Box>
                    </Flex>
                  )
                })}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </MotionBox>
    </Flex>
  )
}
