import cors from 'cors'
import express from 'express'
import { LocalStorage } from 'node-localstorage'

global.localStorage = new LocalStorage('./expensely')

const app = express()
const port = 5000
const storageKey = 'expenses'

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

/**
 * Gets the saved expenses from local storage
 * @returns the list of saved expenses
 */
const getSavedExpenses = () => {
  try {
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return []
  }
}

/**
 * Handles saving a given list of expenses to local storage
 * @param expenses the expenses to save
 * @returns true if successful, otherwise false
 */
const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(expenses))
    return true
  } catch (error) {
    console.error('Error writing to localStorage', error)
    return false
  }
}

app.get('/expenses', (_, response) => {
  const expenses = getSavedExpenses()
  return response.status(200).json(expenses)
})

app.post('/expenses', (request, response) => {
  const expense = request.body

  // perform validation on the expense
  if (
    !expense ||
    !expense.name ||
    !expense.amount ||
    isNaN(expense.amount) ||
    expense.amount < 1 ||
    !expense.category
  ) {
    console.error('Invalid expense data', expense)
    return response.status(400).json({ error: 'Invalid expense data' })
  }

  const savedExpenses = getSavedExpenses()

  const newExpense = {
    id: crypto.randomUUID(),
    dateAdded: Date.now(),
    ...expense,
  }
  const updatedExpenses = [newExpense, ...savedExpenses]

  if (!saveExpenses(updatedExpenses)) {
    return response.status(500).json({ error: 'Failed to save expense' })
  }

  return response.status(200).json({ message: 'Successfully added expense' })
})
