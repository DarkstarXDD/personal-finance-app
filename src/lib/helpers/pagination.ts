export function generatePaginationMobile(
  currentPage: number,
  totalPages: number
) {
  if (totalPages <= 4)
    return Array.from({ length: totalPages }, (_, i) => i + 1)

  if (currentPage <= 2) return [1, 2, "ellipsis", totalPages]
  if (currentPage >= totalPages - 1)
    return [1, "ellipsis", totalPages - 1, totalPages]

  return [1, "ellipsis", currentPage, "ellipsis", totalPages]
}

export function generatePaginationDesktop(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  // If the total number of pages is less than 6,
  // display all pages without any ellipsis.
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ]
}
