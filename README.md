# Expensely

Expensely is an expense-tracking web application that allows users to record and categorise their expenses. This repository contains the client-side React application.

## Features

- Add new expenses with category selection
- View list of expenses in a table
- Filter expenses by category
- View expense distribution by category through a pie chart
- Persistent storage usingt the Expensely API

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [PNPM](https://pnpm.io) installed

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/emilany/expensely.git
   ```
2. Install dependencies:
   ```sh
   pnpm i
   ```

## Running the App

Start the app with:

```sh
pnpm dev
```

This will start the React app at `http://localhost:44345/`.

## API Integration

The client communicates with the Expensely API to store and retrieve expense data.

### Fetch Expenses

```ts
const expenses = await fetchExpenses()
console.log(expenses)
```

### Save a New Expense

```ts
const success = await saveExpense({
  name: 'Groceries',
  amount: 50,
  category: {
    id: 3,
    name: 'Food',
  },
})
if (success) console.log('Expense saved!')
```

## Technologies Used

- **React** - Frontend UI framework
- **React Bootstrap** - Pre-styled UI components
- **React Chart.js** - For visualizing expenses in a pie chart
- **TypeScript** - For type safety

## Limitations

- All expenses are shown regardless of the date they were created.
- The expense table is not paginated and is not too ideal for viewing a large set of expenses.
- Users can't update or remove an expense.
- Currency for the amount is defaulted to euros.

## Challenges Faced

- I've setup some arias for the buttons, but I've relied on react-bootstrap to help with accessibility features. This is an area I'd definitely like to learn more down the line.
- I was initially unsure of how best to setup the UI for the app. I checked some similar apps, but most were a bit too complex. I've decided to keep everything in one screen so the information is readily available to users.
- I chose a default set of categories to simplify filtering the table and displaying data on the chart. I initially thought to allow free-text categories, but that would've required going through expenses to identify unique categories.
- Since I was new to Express.js, I initially built the client side using the browser's storage before transitioning to the backend once it was setup.
