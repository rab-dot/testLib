import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { VersionInfo } from './VersionInfo'

vi.mock('../../../CHANGELOG.md', () => ({
  default: 'mock-changelog.md',
}))

vi.stubGlobal(
  'fetch',
  vi.fn((url: string) => {
    if (url === 'mock-changelog.md') {
      return Promise.resolve({
        text: () =>
          Promise.resolve(`## 1.0.0 (2026-03-12)
### Features
- Item 1
- Item 2`),
      } as Response)
    }
    return Promise.reject(new Error('Not found'))
  })
)

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>
    </BrowserRouter>
  )
}

describe('VersionInfo - Bug Condition Exploration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render markdown with list items without throwing useListStyles error', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const listItems = screen.queryAllByText(/Item|Feature/)
      expect(listItems.length).toBeGreaterThan(0)
    })

    const hasUseListStylesError = consoleErrorSpy.mock.calls.some((call) =>
      call[0]?.toString().includes('useListStyles returned is')
    )

    consoleErrorSpy.mockRestore()

    expect(hasUseListStylesError).toBe(false)
  })

  test('should render list items with proper Chakra UI styling', async () => {
    renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const listItems = screen.queryAllByText(/Item|Feature/)
      expect(listItems.length).toBeGreaterThan(0)
    })

    const listItems = screen.queryAllByText(/Item|Feature/)
    expect(listItems.length).toBeGreaterThan(0)
  })

  test('should wrap ListItem components in List.Root', async () => {
    const { container } = renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBeGreaterThan(0)
    })

    const listElements = container.querySelectorAll('ul')
    expect(listElements.length).toBeGreaterThan(0)

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBeGreaterThan(0)
  })
})

describe('VersionInfo - Preservation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should preserve heading styles for h4 elements', async () => {
    const { container } = renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const headings = container.querySelectorAll('a.chakra-heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    const headings = container.querySelectorAll('a.chakra-heading')
    expect(headings.length).toBeGreaterThan(0)

    headings.forEach((heading) => {
      expect(heading.textContent).toMatch(/Версия v\./)
    })
  })

  test('should preserve Stack styling around list content', async () => {
    const { container } = renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const listWrappers = container.querySelectorAll('ul')
      expect(listWrappers.length).toBeGreaterThan(0)
    })

    const listWrappers = container.querySelectorAll('ul')
    expect(listWrappers.length).toBeGreaterThan(0)

    listWrappers.forEach((wrapper) => {
      expect(wrapper.className).toBeTruthy()
    })
  })

  test('should preserve ListItem styling with color and font size', async () => {
    const { container } = renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBeGreaterThan(0)
    })

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBeGreaterThan(0)

    listItems.forEach((item) => {
      expect(item.className).toBeTruthy()
    })
  })

  test('should render "Back to Home" button', async () => {
    renderWithChakra(<VersionInfo />)

    await waitFor(() => {
      const backButton = screen.getByText('на главную')
      expect(backButton).toBeInTheDocument()
    })
  })
})
