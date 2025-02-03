import { format } from 'date-fns'
import { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import '../styles/ExpenseTable.scss'
import { dateFormat, ExpenseTableHeaders } from '../utils/constants'
import { getSortedExpenses } from '../utils/helpers'
import { Expense, ExpenseSortCriteria, SortOrder } from '../utils/types'

type Props = {
  expenses: Expense[]
}

const ExpenseTable = ({ expenses }: Props) => {
  const [sortCriteria, setSortCriteria] = useState<ExpenseSortCriteria>(
    ExpenseSortCriteria.DATE
  )
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC)

  if (!expenses.length) {
    return (
      <Card className="expense-table expense-table--empty">
        <h5>There are no expenses</h5>
      </Card>
    )
  }

  const sortedExpenses = getSortedExpenses(expenses, sortCriteria, sortOrder)

  const handleTableSort = (updatedSortCriteria: ExpenseSortCriteria) => {
    setSortCriteria(updatedSortCriteria)
    // toggles the sort order if the criteria remains the same, otherwise resets to ASC
    setSortOrder(
      sortCriteria === updatedSortCriteria
        ? sortOrder === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC
        : SortOrder.ASC
    )
  }

  return (
    <Card className="expense-table">
      <Table>
        <thead>
          <tr>
            {ExpenseTableHeaders.map((th) => (
              <th key={th.title} onClick={() => handleTableSort(th.sort)}>
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
