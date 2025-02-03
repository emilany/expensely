import { ExpenseCategory, ExpenseSortCriteria } from './types'

export const dateFormat = 'LLLL d, yyyy'

export const ExpenseCategories: ExpenseCategory[] = [
  { id: '1', name: 'Housing', color: '#FFB3BA' },
  { id: '2', name: 'Transportation', color: '#FFDFBA' },
  { id: '3', name: 'Food', color: '#FFFFBA' },
  { id: '4', name: 'Entertainment', color: '#BAFFC9' },
  { id: '5', name: 'Shopping', color: '#BAE1FF' },
  { id: '6', name: 'Healthcare', color: '#D7BAFF' },
  { id: '7', name: 'Personal', color: '#FFC8DD' },
  { id: '8', name: 'Education', color: '#A1C3D1' },
  { id: '9', name: 'Savings & Investments', color: '#B5EAD7' },
  { id: '10', name: 'Debt Repayment', color: '#F5C6EC' },
  { id: '11', name: 'Others', color: '#D4A5A5' },
]

export const ExpenseTableHeaders: {
  title: string
  sort: ExpenseSortCriteria
}[] = [
  { title: 'Name', sort: ExpenseSortCriteria.NAME },
  { title: 'Date', sort: ExpenseSortCriteria.DATE },
  { title: 'Amount', sort: ExpenseSortCriteria.AMOUNT },
  { title: 'Category', sort: ExpenseSortCriteria.CATEGORY },
]
