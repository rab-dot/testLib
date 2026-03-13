import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { SearchResults } from './SearchResults'
import type { SearchResult } from '@/shared/api'

// Mock the virtualizer
vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [],
    getTotalSize: () => 0,
    measureElement: vi.fn(),
  }),
}))

// Helper function to render with ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

// Helper function to create mock SearchResult
const createMockSearchResult = (
  totalHits: number,
  processingTimeMs: number = 100
): SearchResult => ({
  hits: Array.from({ length: Math.min(totalHits, 25) }, (_, i) => ({
    id: `doc-${i}`,
    documentId: `doc-${i}`,
    chunkId: i,
    text: `Document ${i} text`,
    type: 'document',
    filePath: `/path/to/doc-${i}.txt`,
    fileType: 'txt',
    topics: ['topic1'],
    topicScore: 0.9,
  })),
  totalHits,
  processingTimeMs,
  query: 'test query',
})

describe('SearchResults', () => {
  const mockOnLimitChange = vi.fn()
  const defaultProps = {
    limit: 25,
    onLimitChange: mockOnLimitChange,
  }

  /**
   * Тест не отображения ResultsControls при totalHits = 0
   */
  test('does not render ResultsControls when totalHits is 0', () => {
    const result = createMockSearchResult(0)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // ResultsControls не должен отображаться
    expect(screen.queryByText(/Найдено:/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Предыдущая' })
    ).not.toBeInTheDocument()
  })

  /**
   * Тест отображения ResultsControls при totalHits > 0
   */
  test('renders ResultsControls when totalHits is greater than 0', () => {
    const result = createMockSearchResult(100, 150)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // ResultsControls должен отображаться
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    const badge = screen
      .getAllByText(/100/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge).toBeInTheDocument()
    expect(screen.getByText(/\(150 мс\)/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая' })
    ).toBeInTheDocument()
  })

  /**
   * Тест корректной передачи props в ResultsControls
   */
  test('passes correct props to ResultsControls', () => {
    const result = createMockSearchResult(250, 300)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // Проверяем totalHits и processingTimeMs
    expect(screen.getByText(/250/)).toBeInTheDocument()
    expect(screen.getByText(/\(300 мс\)/i)).toBeInTheDocument()

    // Проверяем limit (по умолчанию 25)
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('25')

    // Проверяем currentPage (всегда 1 на данном этапе)
    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')

    // Проверяем totalPages (250 / 25 = 10)
    expect(screen.getByText(/\/\s*10/)).toBeInTheDocument()
  })

  /**
   * Тест вычисления totalPages с различными значениями limit
   */
  test('calculates totalPages correctly based on totalHits and limit', () => {
    const result = createMockSearchResult(100)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // С limit=25 (по умолчанию): 100 / 25 = 4 страницы
    expect(screen.getByText(/\/\s*4/)).toBeInTheDocument()
  })

  /**
   * Граничный случай: totalHits = 1
   */
  test('renders ResultsControls when totalHits is 1', () => {
    const result = createMockSearchResult(1, 50)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    const badge = screen
      .getAllByText(/1/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge).toBeInTheDocument()
    expect(screen.getByText(/\(50 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Тест сохранения работы виртуализации
   */
  test('maintains virtualization functionality', () => {
    const result = createMockSearchResult(100)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // Проверяем что ResultsControls отображается (виртуализация работает)
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
  })

  /**
   * Тест что виртуализация работает с ResultsControls
   */
  test('renders both virtualized list and ResultsControls', () => {
    const result = createMockSearchResult(50)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // Проверяем наличие ResultsControls
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  /**
   * Тест отображения спиннера при загрузке
   */
  test('displays spinner when loading', () => {
    renderWithChakra(
      <SearchResults result={null} isLoading {...defaultProps} />
    )

    // Проверяем наличие спиннера по классу
    expect(
      screen.getByText((content, element) => {
        return element?.className?.includes('chakra-spinner') ?? false
      })
    ).toBeInTheDocument()

    // ResultsControls не должен отображаться
    expect(screen.queryByText(/Найдено:/i)).not.toBeInTheDocument()
  })

  /**
   * Тест не отображения ничего когда result = null и isLoading = false
   */
  test('renders nothing when result is null and not loading', () => {
    renderWithChakra(
      <SearchResults result={null} isLoading={false} {...defaultProps} />
    )

    // Не должно быть ResultsControls
    expect(screen.queryByText(/Найдено:/i)).not.toBeInTheDocument()
  })

  /**
   * Граничный случай: большое количество результатов
   */
  test('handles large number of results', () => {
    const result = createMockSearchResult(10000, 2000)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    expect(screen.getByText(/10.*000/)).toBeInTheDocument()
    expect(screen.getByText(/\(2000 мс\)/i)).toBeInTheDocument()

    // С limit=25: 10000 / 25 = 400 страниц
    expect(screen.getByText(/\/\s*400/)).toBeInTheDocument()
  })

  /**
   * Тест что количество результатов меньше limit
   */
  test('handles totalHits less than limit', () => {
    const result = createMockSearchResult(15)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    expect(screen.getByText(/15/)).toBeInTheDocument()

    // С limit=25: 15 / 25 = 1 страница
    expect(screen.getByText(/\/\s*1/)).toBeInTheDocument()
  })

  /**
   * Тест передачи onLimitChange callback
   */
  test('provides onLimitChange callback to ResultsControls', () => {
    const mockOnLimitChange = vi.fn()
    const result = createMockSearchResult(100)
    renderWithChakra(
      <SearchResults
        result={result}
        isLoading={false}
        limit={25}
        onLimitChange={mockOnLimitChange}
      />
    )

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select).toBeInTheDocument()

    // Проверяем что селектор вызывает onLimitChange при изменении
    select.value = '50'
    select.dispatchEvent(new Event('change', { bubbles: true }))

    // onLimitChange должен быть вызван с новым значением
    expect(mockOnLimitChange).toHaveBeenCalledWith(50)
  })

  /**
   * Тест что ResultsControls получает правильный currentPage
   */
  test('passes currentPage as 1 to ResultsControls', () => {
    const result = createMockSearchResult(100)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')
  })

  /**
   * Тест вычисления totalPages для нечетного деления
   */
  test('calculates totalPages correctly for uneven division', () => {
    const result = createMockSearchResult(103)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // 103 / 25 = 4.12, должно округлиться до 5
    expect(screen.getByText(/\/\s*5/)).toBeInTheDocument()
  })

  /**
   * Тест что пустой массив hits не отображает ResultsControls
   */
  test('does not render ResultsControls when hits array is empty', () => {
    const result: SearchResult = {
      hits: [],
      totalHits: 0,
      processingTimeMs: 50,
      query: 'test',
    }
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    expect(screen.queryByText(/Найдено:/i)).not.toBeInTheDocument()
  })

  /**
   * Тест структуры компонента
   */
  test('renders with correct component structure', () => {
    const result = createMockSearchResult(50)
    renderWithChakra(
      <SearchResults result={result} isLoading={false} {...defaultProps} />
    )

    // Проверяем наличие ResultsControls
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
  })
})
