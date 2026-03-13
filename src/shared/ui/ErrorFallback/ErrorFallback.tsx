import {
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: (...arg: any[]) => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props
  return (
    <Container height="full">
      <Center height="full">
        <Stack
          gap={3}
          p="10"
          borderRadius="md"
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="red.200"
        >
          <Heading size="md">Компонент сломался 😢</Heading>
          <Text fontSize="md" color="red.300">
            {error.message}
          </Text>
          <Text fontSize="sm" color="red.300">
            error stack:
            {error.stack}
          </Text>
          <Button
            size="sm"
            variant="solid"
            colorPalette="red"
            onClick={resetErrorBoundary}
          >
            Перезагрузить
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default ErrorFallback
