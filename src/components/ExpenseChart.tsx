import 'chart.js/auto'
import { Card } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import '../styles/ExpenseChart.scss'
import { ExpenseCategories } from '../utils/constants'
import { getFormattedAmount, groupExpensesByCategory } from '../utils/helpers'
import { Expense } from '../utils/types'

type Props = {
  expenses: Expense[]
}

const ExpenseChart = ({ expenses }: Props) => {
  if (expenses.length === 0) {
    return (
      <Card className="expense-chart">
        <h5>No expense chart data available</h5>
      </Card>
    )
  }

  const groupedExpenses = groupExpensesByCategory(expenses)

  const data: number[] = []
  const labels: string[] = []
  const backgroundColor: string[] = []
  Object.values(groupedExpenses).forEach((group) => {
    const category = ExpenseCategories.find(
      (item) => item.id === group.category.id
    )

    if (category) {
      data.push(
        group.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      )
      labels.push(category.name)
      backgroundColor.push(category.color)
    }
  })

  return (
    <Card className="expense-chart">
      <Pie
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (item) => getFormattedAmount(item.raw as number),
              },
            },
          },
        }}
      />
    </Card>
  )
}

export default ExpenseChart
