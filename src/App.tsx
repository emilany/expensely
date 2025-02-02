import { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import AddExpenseFormModal from './components/AddExpenseFormModal'
import CategoryDropdown from './components/CategoryDropdown'
import ExpenseChart from './components/ExpenseChart'
import ExpenseTable from './components/ExpenseTable'
import './styles/App.scss'
import { getFromStorage, saveToStorage, STORAGE_KEY } from './utils/storage'
import { Expense } from './utils/types'

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>()
  const [isOpenExpenseFormModal, setIsOpenExpenseFormModal] = useState(false)

  const handleUpdateExpenses = useCallback(() => {
    const storedExpenses = getFromStorage(STORAGE_KEY)
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses))
  }, [])

  useEffect(handleUpdateExpenses, [])

  const handleSaveExpense = (expense: Expense) => {
    const updatedExpenses = [expense, ...expenses]
    saveToStorage(STORAGE_KEY, JSON.stringify(updatedExpenses))
    handleUpdateExpenses()
  }

  const handleOpenExpenseFormModal = () => setIsOpenExpenseFormModal(true)

  const handleCloseExpenseFormModal = () => setIsOpenExpenseFormModal(false)

  const handleFilterExpenses = (category: string) => {
    setFilteredExpenses(
      expenses.filter((expense) => expense.category.toLowerCase() === category)
    )
  }

  return (
    <div className="app">
      <div className="app__heading">
        <h1>Expensely</h1>

        <Button variant="primary" onClick={handleOpenExpenseFormModal}>
          Add Expense
        </Button>
      </div>

      <div className="app__content">
        <div>
          {expenses.length && (
            <CategoryDropdown
              expenses={expenses}
              onFilterExpenses={handleFilterExpenses}
            />
          )}
          <ExpenseTable expenses={filteredExpenses || expenses} />
        </div>

        <ExpenseChart />
      </div>

      {isOpenExpenseFormModal && (
        <AddExpenseFormModal
          isOpen={isOpenExpenseFormModal}
          onSaveExpense={handleSaveExpense}
          onClose={handleCloseExpenseFormModal}
        />
      )}
    </div>
  )
}

export default App
