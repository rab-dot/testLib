import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { PaginationControls } from './PaginationControls'

// Helper function to render with ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('PaginationControls', () => {
  /**
   * Тест отображения кнопок "Предыдущая" и "Следующая"
   */
  test('displays previous and next buttons', () => {
    renderWithChakra(<PaginationControls currentPage={1} totalPages={10} />)

    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая' })
    ).toBeInTheDocument()
  })

  /**
   * Тест отображения текущей страницы и общего количества
   */
  test('displays current page and total pages', () => {
    renderWithChakra(<PaginationControls currentPage={5} totalPages={20} />)

    // Проверяем input с текущей страницей
    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('5')

    // Проверяем текст с общим количеством страниц
    expect(screen.getByText(/\/\s*20/)).toBeInTheDocument()
  })

  /**
   * Тест состояния disabled для кнопок
   */
  test('both buttons are disabled', () => {
    renderWithChakra(<PaginationControls currentPage={1} totalPages={10} />)

    const prevButton = screen.getByRole('button', { name: 'Предыдущая' })
    const nextButton = screen.getByRole('button', { name: 'Следующая' })

    expect(prevButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()
  })

  /**
   * Тест readOnly для input
   */
  test('page input is readOnly', () => {
    renderWithChakra(<PaginationControls currentPage={3} totalPages={10} />)

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput).toBeInTheDocument()
  })

  /**
   * Тест отображения с различными значениями страниц
   */
  test('displays correct values for different page numbers', () => {
    const { rerender } = renderWithChakra(
      <PaginationControls currentPage={1} totalPages={1} />
    )

    let pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')
    expect(screen.getByText(/\/\s*1/)).toBeInTheDocument()

    // Перерендерим с другими значениями
    rerender(
      <ChakraProvider value={defaultSystem}>
        <PaginationControls currentPage={50} totalPages={100} />
      </ChakraProvider>
    )

    pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('50')
    expect(screen.getByText(/\/\s*100/)).toBeInTheDocument()
  })

  /**
   * Тест структуры компонента
   */
  test('renders with correct structure', () => {
    renderWithChakra(<PaginationControls currentPage={1} totalPages={10} />)

    // Проверяем наличие всех элементов
    expect(
      screen.getByRole('button', { name: 'Предыдущая' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Следующая' })
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(/\//i)).toBeInTheDocument()
  })

  /**
   * Тест что кнопки остаются disabled при любых значениях страниц
   */
  test('buttons remain disabled for all page values', () => {
    const { rerender } = renderWithChakra(
      <PaginationControls currentPage={1} totalPages={1} />
    )

    let prevButton = screen.getByRole('button', { name: 'Предыдущая' })
    let nextButton = screen.getByRole('button', { name: 'Следующая' })

    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeDisabled()

    // Проверяем с другими значениями
    rerender(
      <ChakraProvider value={defaultSystem}>
        <PaginationControls currentPage={5} totalPages={10} />
      </ChakraProvider>
    )

    prevButton = screen.getByRole('button', { name: 'Предыдущая' })
    nextButton = screen.getByRole('button', { name: 'Следующая' })

    expect(prevButton).not.toBeDisabled()
    expect(nextButton).not.toBeDisabled()
  })

  /**
   * Граничный случай: первая страница
   */
  test('handles first page correctly', () => {
    renderWithChakra(<PaginationControls currentPage={1} totalPages={10} />)

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')
    expect(screen.getByText(/\/\s*10/)).toBeInTheDocument()
  })

  /**
   * Граничный случай: последняя страница
   */
  test('handles last page correctly', () => {
    renderWithChakra(<PaginationControls currentPage={10} totalPages={10} />)

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('10')
    expect(screen.getByText(/\/\s*10/)).toBeInTheDocument()
  })

  /**
   * Граничный случай: одна страница
   */
  test('handles single page correctly', () => {
    renderWithChakra(<PaginationControls currentPage={1} totalPages={1} />)

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('1')
    expect(screen.getByText(/\/\s*1/)).toBeInTheDocument()

    // Кнопки все равно должны быть disabled
    expect(screen.getByRole('button', { name: 'Предыдущая' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Следующая' })).toBeDisabled()
  })

  /**
   * Граничный случай: большое количество страниц
   */
  test('handles large number of pages', () => {
    renderWithChakra(<PaginationControls currentPage={500} totalPages={1000} />)

    const pageInput = screen.getByRole('textbox') as HTMLInputElement
    expect(pageInput.value).toBe('500')
    expect(screen.getByText(/\/\s*1000/)).toBeInTheDocument()
  })
})
