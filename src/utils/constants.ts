import { ExpenseCategory, ExpenseSortCriteria } from './types'

export const storageKey = 'expensely_expenses'
export const dateFormat = 'LLLL d, yyyy'

export const ExpenseCategories: ExpenseCategory[] = [
  { id: '1', name: 'Housing' },
  { id: '2', name: 'Transportation' },
  { id: '3', name: 'Food' },
  { id: '4', name: 'Entertainment' },
  { id: '5', name: 'Shopping' },
  { id: '6', name: 'Healthcare' },
  { id: '7', name: 'Personal' },
  { id: '8', name: 'Education' },
  { id: '9', name: 'Savings & Investments' },
  { id: '10', name: 'Debt Repayment' },
  { id: '11', name: 'Others' },
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
