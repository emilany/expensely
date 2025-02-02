import { format } from 'date-fns'
import { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import '../styles/ExpenseTable.scss'
import { dateFormat, ExpenseTableHeaders } from '../utils/constants'
import { Expense, ExpenseSortCriteria } from '../utils/types'

type Props = {
  expenses: Expense[]
}

const ExpenseTable = ({ expenses }: Props) => {
  const [sortCriteria, setSortCriteria] = useState<ExpenseSortCriteria>(
    ExpenseSortCriteria.DATE
  )

  if (!expenses.length) {
    return (
      <Card className="expense-table expense-table--empty">
        <h5>There are no expenses.</h5>
      </Card>
    )
  }

  const sortedExpenses = expenses.sort((a, b) => {
    if (a[sortCriteria] > b[sortCriteria]) return 1
    if (a[sortCriteria] < b[sortCriteria]) return -1
    return 0
  })

  return (
    <Card className="expense-table">
      <Table>
        <thead>
          <tr>
            {ExpenseTableHeaders.map((th) => (
              <th key={th.title} onClick={() => setSortCriteria(th.sort)}>
                {th.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{format(expense.dateAdded, dateFormat)}</td>
              <td>€{expense.amount.toFixed(2)}</td>
              <td>{expense.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

export default ExpenseTable
