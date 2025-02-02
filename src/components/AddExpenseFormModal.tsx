import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Expense } from '../utils/types'

type Props = {
  isOpen: boolean
  onSaveExpense: (expense: Expense) => void
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    onSaveExpense({
      id: crypto.randomUUID(),
      name,
      amount: amountAsNumber,
      category,
      dateAdded: Date.now(),
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
          <Form.Control
            required={true}
            type="number"
            min={1}
            value={amount}
            onChange={handleAmountChange}
          />
          <Form.Text>{amountError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            required={true}
            placeholder="Travel"
            value={category}
            onChange={handleCategoryChange}
          />
          <Form.Text>{categoryError}</Form.Text>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveExpense}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddExpenseFormModal
