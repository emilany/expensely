import cors from 'cors'
import express from 'express'
import { LocalStorage } from 'node-localstorage'

global.localStorage = new LocalStorage('./expensely')

const app = express()
const port = 5000

const storageKey = 'expensely_expenses'

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

app.get('/expenses', (_, response) => {
  try {
    const data = localStorage.getItem(storageKey)

    if (!data) return response.status(200).json([])

    const savedExpenses = JSON.parse(data)
    return response.status(200).json(savedExpenses)
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/expenses', (request, response) => {
  const expense = request.body

  // perform validation on the expense
  if (!expense || !expense.name || !expense.amount || !expense.category) {
    console.error('Invalid expense data', expense)
    return response.status(400).json({ error: 'Invalid expense data' })
  }

  // fetch saved expenses
  let savedExpenses = []
  try {
    const data = localStorage.getItem(storageKey)
    if (data) savedExpenses = JSON.parse(data)
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return response.status(500).json({ error: 'Internal server error' })
  }

  // save the new expense
  try {
    const newExpense = {
      id: crypto.randomUUID(),
      dateAdded: Date.now(),
      ...expense,
    }
    localStorage.setItem(
      storageKey,
      JSON.stringify([newExpense, ...savedExpenses])
    )
  } catch (error) {
    console.error('Error writing to localStorage', error)
    return response.status(500).json({ error: 'Failed to save expense' })
  }

  return response.status(200).json({ message: 'Successfully added expense' })
})
