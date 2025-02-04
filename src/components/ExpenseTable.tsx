import { format } from 'date-fns'
import { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'
import '../styles/ExpenseTable.scss'
import { dateFormat, ExpenseTableHeaders } from '../utils/constants'
import { getFormattedAmount, getSortedExpenses } from '../utils/helpers'
import { Expense, ExpenseSortCriteria, SortOrder } from '../utils/types'

type Props = {
  expenses: Expense[]
  hasSelectedCategory: boolean
}

const ExpenseTable = ({ expenses, hasSelectedCategory }: Props) => {
  const [sortCriteria, setSortCriteria] = useState<ExpenseSortCriteria>(
    ExpenseSortCriteria.DATE
  )
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC)

  if (expenses.length === 0) {
    return (
      <Card className="expense-table expense-table--empty">
        <h5>
          There are no expenses{hasSelectedCategory ? ' in this category' : ''}
        </h5>
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
                {sortCriteria === th.sort &&
                  (sortOrder === SortOrder.ASC ? <ArrowUp /> : <ArrowDown />)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{format(expense.dateAdded, dateFormat)}</td>
              <td>{getFormattedAmount(expense.amount)}</td>
              <td>{expense.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

export default ExpenseTable
