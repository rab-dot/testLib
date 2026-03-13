/**
 * Информация о пагинации результатов поиска
 */
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  itemsPerPage: number
}

/**
 * Вычисляет информацию о пагинации на основе общего количества результатов и лимита
 *
 * @param totalHits - Общее количество найденных документов
 * @param limit - Количество документов на странице
 * @returns Информация о пагинации с защитой от некорректных значений
 */
export function calculatePagination(
  totalHits: number,
  limit: number
): PaginationInfo {
  // Защита от некорректных значений limit
  const safeLimit = limit > 0 ? limit : 25

  // Вычисление общего количества страниц
  const totalPages = Math.ceil(totalHits / safeLimit)

  return {
    currentPage: 1, // Всегда 1 на данном этапе
    totalPages: totalPages > 0 ? totalPages : 1,
    itemsPerPage: safeLimit,
  }
}
