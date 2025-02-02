import { Dropdown } from 'react-bootstrap'
import '../styles/CategoryDropdown.scss'
import { Expense } from '../utils/types'

type Props = {
  expenses: Expense[]
  onFilterExpenses: (category: string) => void
}

const CategoryDropdown = ({ expenses, onFilterExpenses }: Props) => {
  const categories = expenses.reduce<string[]>((data, expense) => {
    const category = expense.category.toLowerCase()
    if (data.some((item) => item === category)) return data
    return [...data, category]
  }, [])

  return (
    <Dropdown className="category-dropdown mb-3">
      <Dropdown.Toggle variant="secondary">Filter by Category</Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item
            key={category}
            onClick={() => onFilterExpenses(category)}
          >
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoryDropdown
