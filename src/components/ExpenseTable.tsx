import { format } from 'date-fns'
import { Card, Table } from 'react-bootstrap'
import '../styles/ExpenseTable.scss'
import { Expense } from '../utils/types'

type Props = {
  expenses: Expense[]
}

const dateFormat = 'LLLL d, yyyy'

const ExpenseTable = ({ expenses }: Props) => {
  if (!expenses.length) {
    return (
      <Card className="expense-table">
        <h5>There are no expenses.</h5>
      </Card>
    )
  }

  return (
    <Card className="expense-table">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{format(expense.dateAdded, dateFormat)}</td>
              <td>€{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

export default ExpenseTable
