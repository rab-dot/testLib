import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { LimitSelector } from './LimitSelector'

// Helper function to render with ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('LimitSelector', () => {
  /**
   * Тест отображения всех опций [10, 25, 50, 100]
   */
  test('displays all limit options', () => {
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    // Проверяем, что все опции присутствуют
    expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '25' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '50' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '100' })).toBeInTheDocument()
  })

  /**
   * Тест значения по умолчанию (25)
   */
  test('displays default value of 25', () => {
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    // Проверяем, что селектор имеет значение 25
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('25')
  })

  /**
   * Тест вызова onChange при изменении значения
   */
  test('calls onChange when value is changed', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    const select = screen.getByRole('combobox')

    // Изменяем значение на 50
    await user.selectOptions(select, '50')

    // Проверяем, что onChange был вызван с числовым значением 50
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(50)
  })

  /**
   * Тест вызова onChange с разными значениями
   */
  test('calls onChange with correct numeric values for all options', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    const select = screen.getByRole('combobox')

    // Тестируем изменение на 10
    await user.selectOptions(select, '10')
    expect(mockOnChange).toHaveBeenLastCalledWith(10)

    // Тестируем изменение на 100
    await user.selectOptions(select, '100')
    expect(mockOnChange).toHaveBeenLastCalledWith(100)
  })

  /**
   * Тест корректного количества опций
   */
  test('renders exactly 4 options', () => {
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
  })

  /**
   * Тест отображения с различными начальными значениями
   */
  test('displays correct initial value for each option', () => {
    const mockOnChange = vi.fn()

    // Тест с value=10
    const { rerender } = renderWithChakra(
      <LimitSelector value={10} onChange={mockOnChange} />
    )
    let select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('10')

    // Тест с value=50
    rerender(
      <ChakraProvider value={defaultSystem}>
        <LimitSelector value={50} onChange={mockOnChange} />
      </ChakraProvider>
    )
    select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('50')

    // Тест с value=100
    rerender(
      <ChakraProvider value={defaultSystem}>
        <LimitSelector value={100} onChange={mockOnChange} />
      </ChakraProvider>
    )
    select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('100')
  })

  /**
   * Тест структуры компонента
   */
  test('renders as a select element with correct attributes', () => {
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })

  /**
   * Тест что onChange не вызывается без взаимодействия пользователя
   */
  test('does not call onChange on initial render', () => {
    const mockOnChange = vi.fn()
    renderWithChakra(<LimitSelector value={25} onChange={mockOnChange} />)

    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
