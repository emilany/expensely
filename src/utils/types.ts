export type Expense = {
  id: string
  name: string
  amount: number
  category: string
  dateAdded: number
}

export enum ExpenseSortCriteria {
  NAME = 'name',
  DATE = 'dateAdded',
  AMOUNT = 'amount',
  CATEGORY = 'category',
}
