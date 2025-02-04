# Expensely API

Expensely is a simple Express.js-based API for managing expenses. It uses node-localstorage to store expense data locally.

## Features

- Fetch all saved expenses
- Add a new expense

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [PNPM](https://pnpm.io) installed

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/emilany/expensely.git
   ```
2. Navigate to the project directory:
   ```sh
   cd expensely
   ```
3. Install dependencies:
   ```sh
   pnpm i
   ```

## Running the Server

Start the server with:

```sh
pnpm dev
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Get All Expenses

**GET** `/expenses`

#### Response

- `200 OK` - Returns a JSON array of expenses
- `500 Internal Server Error` - If retrieving data fails

Example response:

```json
[
  {
    "id": "c1f6d7c3-8e02-4c71-b50d-805bf7693b35",
    "name": "Groceries",
    "amount": 50,
    "category": {
      "id": "3",
      "name": "Food"
    },
    "dateAdded": 1738566191973
  }
]
```

### Add an Expense

**POST** `/expenses`

#### Request Body (JSON)

```json
{
  "name": "Lunch",
  "amount": 15.99,
  "category": {
    "id": "3",
    "name": "Food"
  }
}
```

#### Response

- `200 OK` - Expense added successfully
- `400 Bad Request` - Invalid expense data
- `500 Internal Server Error` - Failed to save expense

## Technologies Used

- **Node.js**
- **Express.js**
- **node-localstorage** - Local storage for persisting data

## Limitations

- This API stores data in a local JSON file.
- Default category data is stored in the client so I've opted to store the category object for ease. This can be improved to just store reference to the category ID.
  - I can potentially setup a `getExpenseCategories` endpoint that returns all expense categories and the client doesn't need to handle storing it anymore.
