import { useState } from 'react'
import { Form } from 'react-bootstrap'
import '../styles/CategoryDropdown.scss'
import { ExpenseCategories } from '../utils/constants'

type Props = {
  onFilterExpenses: (categoryId: string | undefined) => void
}

const ALL_CATEGORIES_ID = '0'

const CategoryDropdown = ({ onFilterExpenses }: Props) => {
  const [category, setCategory] = useState<string>('')

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    setCategory(selectedCategory)
    onFilterExpenses(
      selectedCategory === ALL_CATEGORIES_ID ? undefined : selectedCategory
    )
  }

  return (
    <div className="category-dropdown">
      <Form.Select
        required={true}
        value={category}
        onChange={handleCategoryChange}
      >
        <option value={ALL_CATEGORIES_ID}>All Categories</option>
        {ExpenseCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}

export default CategoryDropdown
