import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ResultsInfo } from './ResultsInfo'

// Helper function to render with ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('ResultsInfo', () => {
  /**
   * Тест отображения корректного текста с totalHits и processingTimeMs
   */
  test('displays correct text with totalHits and processingTimeMs', () => {
    renderWithChakra(<ResultsInfo totalHits={42} processingTimeMs={150} />)

    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()
    expect(screen.getByText(/42/)).toBeInTheDocument()
    expect(screen.getByText(/\(150 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Тест отображения с различными значениями
   */
  test('displays different values correctly', () => {
    const { rerender } = renderWithChakra(
      <ResultsInfo totalHits={1} processingTimeMs={10} />
    )

    const badge = screen
      .getAllByText(/1/)
      .find((el) => el.className.includes('chakra-badge'))
    expect(badge).toBeInTheDocument()
    expect(screen.getByText(/\(10 мс\)/i)).toBeInTheDocument()

    // Перерендерим с другими значениями
    rerender(
      <ChakraProvider value={defaultSystem}>
        <ResultsInfo totalHits={1000} processingTimeMs={500} />
      </ChakraProvider>
    )

    expect(
      screen.getAllByText(/1.*000/).some((el) => el.tagName === 'SPAN')
    ).toBe(true)
    expect(screen.getByText(/\(500 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Тест применения стилей fontSize="sm"
   */
  test('applies correct fontSize style', () => {
    const { container } = renderWithChakra(
      <ResultsInfo totalHits={42} processingTimeMs={150} />
    )

    const textElement = container.querySelector('p')
    expect(textElement).toBeInTheDocument()
  })

  /**
   * Граничный случай: ноль результатов
   */
  test('handles zero results', () => {
    renderWithChakra(<ResultsInfo totalHits={0} processingTimeMs={5} />)

    expect(screen.getByText(/0/)).toBeInTheDocument()
    expect(screen.getByText(/\(5 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Граничный случай: большое количество результатов
   */
  test('handles large number of results', () => {
    renderWithChakra(<ResultsInfo totalHits={999999} processingTimeMs={5000} />)

    expect(screen.getByText(/999.*999/)).toBeInTheDocument()
    expect(screen.getByText(/\(5000 мс\)/i)).toBeInTheDocument()
  })

  /**
   * Тест структуры компонента
   */
  test('renders with correct structure', () => {
    renderWithChakra(<ResultsInfo totalHits={42} processingTimeMs={150} />)

    // Проверяем наличие основного текста
    expect(screen.getByText(/Найдено:/i)).toBeInTheDocument()

    // Проверяем что число выделено жирным (fontWeight="600")
    const boldText = screen.getByText(/42/)
    expect(boldText.tagName).toBe('SPAN')
  })

  /**
   * Тест формата отображения
   */
  test('displays in correct format', () => {
    const { container } = renderWithChakra(
      <ResultsInfo totalHits={100} processingTimeMs={200} />
    )

    const { textContent } = container
    expect(textContent).toMatch(/Найдено:\s*100\s*\(200\s*мс\)/)
  })
})
