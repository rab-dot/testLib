import { describe, test, expect } from 'vitest'
import fc from 'fast-check'
import { calculatePagination, type PaginationInfo } from './pagination'

describe('pagination utilities', () => {
  /**
   * **Feature: search-results-pagination, Property 2: Вычисление общего количества страниц**
   * **Validates: Requirements 3.3**
   *
   * For any положительного значения totalHits и любого допустимого значения limit,
   * общее количество страниц должно вычисляться как Math.ceil(totalHits / limit),
   * и результат должен быть не меньше 1.
   */
  test('Property 2: total pages calculation is correct for all valid inputs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }), // totalHits
        fc.constantFrom(10, 25, 50, 100), // limit
        (totalHits, limit) => {
          const result: PaginationInfo = calculatePagination(totalHits, limit)
          const expectedPages = Math.ceil(totalHits / limit)

          // Проверка корректности вычисления общего количества страниц
          expect(result.totalPages).toBe(expectedPages)

          // Проверка, что количество страниц не меньше 1
          expect(result.totalPages).toBeGreaterThanOrEqual(1)

          // Проверка, что itemsPerPage соответствует переданному limit
          expect(result.itemsPerPage).toBe(limit)

          // Проверка, что текущая страница всегда 1 (на данном этапе)
          expect(result.currentPage).toBe(1)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Дополнительный property тест для проверки защиты от некорректных значений
  test('Property: calculatePagination handles invalid limit values safely', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }), // totalHits (включая 0)
        fc.integer({ min: -100, max: 0 }), // некорректные значения limit
        (totalHits, invalidLimit) => {
          const result: PaginationInfo = calculatePagination(
            totalHits,
            invalidLimit
          )

          // При некорректном limit должно использоваться значение по умолчанию (25)
          expect(result.itemsPerPage).toBe(25)

          // Количество страниц должно быть не меньше 1
          expect(result.totalPages).toBeGreaterThanOrEqual(1)

          // Текущая страница всегда 1
          expect(result.currentPage).toBe(1)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Unit тесты для конкретных граничных случаев
  describe('unit tests for edge cases', () => {
    test('handles zero totalHits', () => {
      const result = calculatePagination(0, 25)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(25)
    })

    test('handles single result', () => {
      const result = calculatePagination(1, 25)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(25)
    })

    test('handles exact page boundary', () => {
      const result = calculatePagination(50, 25)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(25)
    })

    test('handles results exceeding page boundary', () => {
      const result = calculatePagination(51, 25)
      expect(result.totalPages).toBe(3)
      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(25)
    })

    test('uses default limit when limit is zero', () => {
      const result = calculatePagination(100, 0)
      expect(result.itemsPerPage).toBe(25)
      expect(result.totalPages).toBe(4)
    })

    test('uses default limit when limit is negative', () => {
      const result = calculatePagination(100, -10)
      expect(result.itemsPerPage).toBe(25)
      expect(result.totalPages).toBe(4)
    })

    test('handles large number of results', () => {
      const result = calculatePagination(10000, 25)
      expect(result.totalPages).toBe(400)
      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(25)
    })
  })
})
