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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>()
  const [isOpenExpenseFormModal, setIsOpenExpenseFormModal] = useState(false)

  const handleUpdateExpenses = useCallback(async () => {
    const updatedExpenses = await fetchExpenses()
    setExpenses(updatedExpenses)
  }, [])

  useEffect(() => {
    handleUpdateExpenses()
  }, [])

  useEffect(() => {
    setFilteredExpenses(
      selectedCategoryId
        ? expenses.filter(
            (expense) => expense.category.id === selectedCategoryId
          )
        : undefined
    )
  }, [expenses, selectedCategoryId])

  const handleSaveExpense = async (expense: AddNewExpenseRequest) => {
    const success = await saveExpense(expense)
    if (success) await handleUpdateExpenses()
  }

  const handleOpenExpenseFormModal = () => setIsOpenExpenseFormModal(true)

  const handleCloseExpenseFormModal = () => setIsOpenExpenseFormModal(false)

  const handleFilterExpenses = (categoryId?: string) => {
    setSelectedCategoryId(categoryId)
  }

  return (
    <div className="app">
      <div className="app__heading">
        <h1>Expensely</h1>

        <Button
          className="app__button"
          aria-label="Add expense"
          variant="primary"
          onClick={handleOpenExpenseFormModal}
        >
          Add Expense
        </Button>
      </div>

      {expenses.length > 0 && (
        <CategoryDropdown onFilterExpenses={handleFilterExpenses} />
      )}

      <div className="app__content">
        <ExpenseTable
          expenses={filteredExpenses || expenses}
          hasSelectedCategory={!!selectedCategoryId}
        />
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
