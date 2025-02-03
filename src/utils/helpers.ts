import { Expense, ExpenseSortCriteria, SortOrder } from './types'

export const saveToStorage = (key: string, data: string) => {
  window.localStorage.setItem(key, data)
}

export const getFromStorage = (key: string) => window.localStorage.getItem(key)

/**
 * Sorts a list of expenses based on a specified sort criteria and sort order.
 * An expense category is handled differently given it's an object.
 * @param expenses the list of expenses to sort
 * @param sortCriteria the sort criteria
 * @param sortOrder the sort order
 * @returns the list of sorted expenses
 */
export const getSortedExpenses = (
  expenses: Expense[],
  sortCriteria: ExpenseSortCriteria,
  sortOrder: SortOrder
): Expense[] =>
  expenses.sort((a, b) => {
    const itemA =
      sortCriteria === ExpenseSortCriteria.CATEGORY
        ? a.category.name
        : a[sortCriteria].toString()
    const itemB =
      sortCriteria === ExpenseSortCriteria.CATEGORY
        ? b.category.name
        : b[sortCriteria].toString()

    return sortOrder === SortOrder.ASC
      ? itemA.localeCompare(itemB)
      : itemB.localeCompare(itemA)
  })
