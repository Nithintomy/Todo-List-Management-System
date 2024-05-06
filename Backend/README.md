# Todo List Backend Application

This is a Node.js backend application built with Express.js for managing a todo list. Users can perform CRUD operations on todo items, upload todo items from a CSV file, download the todo list in CSV format, and set a status flag for each todo item.

Postman documentation :

https://documenter.getpostman.com/view/26933333/2sA3JJ83Et

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB installed and running locally

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list-backend.git

   ```

2. Install dependencies:

 ```bash
    cd todo-list-backend
    npm install

  ```
3. Starting the Server
 ```bash
    npm start


API Endpoints
GET /api/todos: Fetch all todo items.
GET /api/todos/:id: Fetch a single todo item by ID.
POST /api/todos: Add a new todo item.
PUT /api/todos/:id: Update an existing todo item.
DELETE /api/todos/:id: Delete a todo item.
POST /api/todos/upload: Upload todo items from a CSV file.
GET /api/todos/download: Download the todo list in CSV format.
GET /api/todos/filter?status=:status: Filter todo list items based on status.


Database Setup

MongoDB 


MongoDB connection URI: mongodb://localhost:27017/todo_list




