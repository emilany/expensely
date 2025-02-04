import { AddNewExpenseRequest, Expense } from './types'

const apiUrl = 'http://localhost:5000'

/**
 * Performs an API call to fetch expenses.
 * @returns the list of expenses, if available
 */
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await fetch(`${apiUrl}/expenses`)
    if (!response.ok) {
      console.error('Failed to fetch expenses')
      return []
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching expenses', error)
    return []
  }
}

/**
 * Performs an API call to save an expense.
 * @param expense the expense to save
 * @returns true if the expense is saved; false if otherwise
 */
export const saveExpense = async (
  expense: AddNewExpenseRequest
): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
    return response.ok
  } catch (error) {
    console.error('Error saving expense', error)
    return false
  }
}
