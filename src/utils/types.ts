export type Expense = {
  id: string
  name: string
  amount: number
  category: ExpenseCategory
  dateAdded: number
}

export type AddNewExpenseRequest = Pick<Expense, 'name' | 'amount' | 'category'>

export type ExpenseCategory = {
  id: string
  name: string
  color: string
}

export type GroupedExpenses = Record<
  string,
  { category: ExpenseCategory; expenses: Expense[] }
>

export enum ExpenseSortCriteria {
  NAME = 'name',
  DATE = 'dateAdded',
  AMOUNT = 'amount',
  CATEGORY = 'category',
}

export enum SortOrder {
  ASC,
  DESC,
}
