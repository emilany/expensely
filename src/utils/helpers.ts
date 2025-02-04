import {
  Expense,
  ExpenseSortCriteria,
  GroupedExpenses,
  SortOrder,
} from './types'

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

/**
 * Groups a list of expenses based on their category.
 * @param expenses the expenses to group
 * @returns the grouped expenses by category
 */
export const groupExpensesByCategory = (expenses: Expense[]): GroupedExpenses =>
  expenses.reduce<GroupedExpenses>((data, expense) => {
    const categoryId = expense.category.id
    // check if the category exists in the object
    if (!data[categoryId]) {
      data[categoryId] = {
        category: expense.category,
        expenses: [],
      }
    }
    data[categoryId].expenses.push(expense)
    return data
  }, {})

/**
 * Formats a given amount as a string in euros.
 * @param amount the amount to format
 * @returns the formatted amount
 */
export const getFormattedAmount = (amount: number) => `€${amount.toFixed(2)}`
