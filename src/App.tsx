import { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import AddExpenseFormModal from './components/AddExpenseFormModal'
import CategoryDropdown from './components/CategoryDropdown'
import ExpenseChart from './components/ExpenseChart'
import ExpenseTable from './components/ExpenseTable'
import './styles/App.scss'
import { fetchExpenses, saveExpense } from './utils/api'
import { AddNewExpenseRequest, Expense } from './utils/types'

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>()
  const [isOpenExpenseFormModal, setIsOpenExpenseFormModal] = useState(false)

  const handleUpdateExpenses = useCallback(async () => {
    setExpenses(await fetchExpenses())
  }, [])

  useEffect(() => {
    handleUpdateExpenses()
  }, [])

  const handleSaveExpense = async (expense: AddNewExpenseRequest) => {
    const success = await saveExpense(expense)
    if (success) await handleUpdateExpenses()
  }

  const handleOpenExpenseFormModal = () => setIsOpenExpenseFormModal(true)

  const handleCloseExpenseFormModal = () => setIsOpenExpenseFormModal(false)

  const handleFilterExpenses = (categoryId: string | undefined) => {
    setFilteredExpenses(
      categoryId
        ? expenses.filter((expense) => expense.category.id === categoryId)
        : expenses
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

      {expenses.length > 0 && (
        <CategoryDropdown onFilterExpenses={handleFilterExpenses} />
      )}

      <div className="app__content">
        <ExpenseTable expenses={filteredExpenses || expenses} />
        <ExpenseChart expenses={expenses} />
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
