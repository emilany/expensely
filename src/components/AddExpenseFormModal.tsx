import { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { ExpenseCategories } from '../utils/constants'
import { AddNewExpenseRequest } from '../utils/types'

type Props = {
  isOpen: boolean
  onSaveExpense: (expense: AddNewExpenseRequest) => void
  onClose: () => void
}

const AddExpenseFormModal = ({ isOpen, onSaveExpense, onClose }: Props) => {
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const [nameError, setNameError] = useState<string>()
  const [amountError, setAmountError] = useState<string>()
  const [categoryError, setCategoryError] = useState<string>()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameError(undefined)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setAmountError(undefined)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    setCategoryError(undefined)
  }

  const handleSaveExpense = () => {
    if (!name) {
      setNameError('An expense name is required')
      return
    }

    if (!amount) {
      setAmountError('An expense amount is required')
      return
    }

    const amountAsNumber = Number(amount)
    if (isNaN(amountAsNumber) || amountAsNumber < 1) {
      setAmountError('Invalid expense amount provided')
      return
    }

    if (!category) {
      setCategoryError('An expense category is required')
      return
    }

    const categoryIndex = Number(category) - 1
    onSaveExpense({
      name,
      amount: amountAsNumber,
      category: ExpenseCategories[categoryIndex],
    })

    onClose()
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required={true}
            value={name}
            onChange={handleNameChange}
          />
          <Form.Text>{nameError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>€</InputGroup.Text>
            <Form.Control
              required={true}
              type="number"
              min={1}
              value={amount}
              onChange={handleAmountChange}
            />
          </InputGroup>
          <Form.Text>{amountError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            required={true}
            value={category}
            onChange={handleCategoryChange}
          >
            <option>Select a category</option>
            {ExpenseCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Text>{categoryError}</Form.Text>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} aria-label="Close modal">
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveExpense}
          aria-label="Save expense"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddExpenseFormModal
