import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import AddExpenseFormModal from './components/AddExpenseFormModal'
import './styles/app.scss'
import { getFromStorage, saveToStorage, STORAGE_KEY } from './utils/storage'
import { Expense } from './utils/types'

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isOpenExpenseFormModal, setIsOpenExpenseFormModal] = useState(false)

  useEffect(() => {
    const storedExpenses = getFromStorage(STORAGE_KEY)
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses))
  }, [])

  const handleSaveExpense = (expense: Expense) => {
    const updatedExpenses = [expense, ...expenses]
    saveToStorage(STORAGE_KEY, JSON.stringify(updatedExpenses))
  }

  const handleOpenExpenseFormModal = () => setIsOpenExpenseFormModal(true)

  const handleCloseExpenseFormModal = () => setIsOpenExpenseFormModal(false)

  return (
    <div className="app">
      <h1>Expensely</h1>

      <Button variant="primary" onClick={handleOpenExpenseFormModal}>
        Add Expense
      </Button>

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
