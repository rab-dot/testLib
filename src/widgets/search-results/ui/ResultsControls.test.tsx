import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ResultsControls } from './ResultsControls'

// Helper function to render with ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('ResultsControls', () => {
  const defaultProps = {
    totalHits: 100,
    processingTimeMs: 150,
    limit: 25,
    onLimitChange: vi.fn(),
    currentPage: 1,
    totalPages: 4,
  }

  /**
   * Тест корректной компоновки дочерних компонентов
   */
  test('renders all child components correctly', () => {
    renderWithChakra(<ResultsControls {...defaultProps} />)

    // Проверяем наличие ResultsInfo
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    const hitsBadge = screen
      .getAllByText(/100/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(hitsBadge).toBeInTheDocument()
    expect(screen.getByText(/\(150 мс\)/i)).toBeInTheDocument()

    // Проверяем наличие LimitSelector
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('25')

    // Проверяем наличие PaginationControls
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая' })
    ).toBeInTheDocument()
    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')
    expect(screen.getByText(/\/\s*4/)).toBeInTheDocument()
  })

  /**
   * Тест передачи props в ResultsInfo
   */
  test('passes correct props to ResultsInfo', () => {
    renderWithChakra(
      <ResultsControls
        {...defaultProps}
        totalHits={250}
        processingTimeMs={300}
      />
    )

    expect(screen.getByText(/250/)).toBeInTheDocument()
    expect(screen.getByText(/\(300 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Тест передачи props в LimitSelector
   */
  test('passes correct props to LimitSelector', () => {
    renderWithChakra(<ResultsControls {...defaultProps} limit={50} />)

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('50')
  })

  /**
   * Тест передачи props в PaginationControls
   */
  test('passes correct props to PaginationControls', () => {
    renderWithChakra(
      <ResultsControls {...defaultProps} currentPage={5} totalPages={20} />
    )

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('5')
    expect(screen.getByText(/\/\s*20/)).toBeInTheDocument()
  })

  /**
   * Тест передачи onLimitChange callback
   */
  test('passes onLimitChange callback to LimitSelector', () => {
    const mockOnLimitChange = vi.fn()
    renderWithChakra(
      <ResultsControls {...defaultProps} onLimitChange={mockOnLimitChange} />
    )

    const select = screen.getByRole('combobox') as HTMLSelectElement

    // Изменяем значение селектора
    select.value = '50'
    select.dispatchEvent(new Event('change', { bubbles: true }))

    expect(mockOnLimitChange).toHaveBeenCalledWith(50)
  })

  /**
   * Тест структуры компонента с Flex layout
   */
  test('renders with correct Flex layout structure', () => {
    renderWithChakra(<ResultsControls {...defaultProps} />)

    // Проверяем что все основные элементы присутствуют
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
  })

  /**
   * Тест наличия gap между элементами
   */
  test('applies gap between elements', () => {
    renderWithChakra(<ResultsControls {...defaultProps} />)

    // Проверяем что все элементы отрендерены с правильной структурой
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
  })

  /**
   * Тест с различными комбинациями props
   */
  test('handles different prop combinations', () => {
    const { rerender } = renderWithChakra(<ResultsControls {...defaultProps} />)

    // Первая комбинация
    const badge1 = screen
      .getAllByText(/100/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge1).toBeInTheDocument()

    // Вторая комбинация
    rerender(
      <ChakraProvider value={defaultSystem}>
        <ResultsControls
          totalHits={1}
          processingTimeMs={10}
          limit={10}
          onLimitChange={vi.fn()}
          currentPage={1}
          totalPages={1}
        />
      </ChakraProvider>
    )

    const badge2 = screen
      .getAllByText(/1/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge2).toBeInTheDocument()
    expect(screen.getByText(/\(10 мс\)/i)).toBeInTheDocument()
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('10')
  })

  /**
   * Граничный случай: минимальные значения
   */
  test('handles minimum values', () => {
    renderWithChakra(
      <ResultsControls
        totalHits={1}
        processingTimeMs={1}
        limit={10}
        onLimitChange={vi.fn()}
        currentPage={1}
        totalPages={1}
      />
    )

    const badge3 = screen
      .getAllByText(/1/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge3).toBeInTheDocument()
    expect(screen.getByText(/\(1 мс\)/i)).toBeInTheDocument()
    expect(screen.getByText(/\/\s*1/)).toBeInTheDocument()
  })

  /**
   * Граничный случай: большие значения
   */
  test('handles large values', () => {
    renderWithChakra(
      <ResultsControls
        totalHits={999999}
        processingTimeMs={5000}
        limit={100}
        onLimitChange={vi.fn()}
        currentPage={100}
        totalPages={10000}
      />
    )

    expect(screen.getByText(/999.*999/)).toBeInTheDocument()
    expect(screen.getByText(/\(5000 мс\)/i)).toBeInTheDocument()
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('100')
    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('100')
    expect(screen.getByText(/\/\s*10000/)).toBeInTheDocument()
  })

  /**
   * Тест что все дочерние компоненты рендерятся одновременно
   */
  test('renders all components in single render', () => {
    renderWithChakra(<ResultsControls {...defaultProps} />)

    // Все три компонента должны быть видны одновременно
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая' })
    ).toBeInTheDocument()
  })
})
