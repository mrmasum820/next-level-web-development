# Library Management System API

A robust Library Management System API built with Express, TypeScript, and MongoDB (using Mongoose). This application allows users to manage books, track borrowing records, and generate summaries of borrowed books with features like schema validation, business logic enforcement, and MongoDB aggregation pipelines.

## Features

- Book Management:

  - Create, read, update, and delete books with proper validation.

  - Filter books by genre, sort by fields (e.g., createdAt), and paginate results.

  - Unique ISBN enforcement to prevent duplicate books.

  - Automatic availability status updates based on available copies.

- Borrowing System:

  - Borrow books with validation for available copies.

  - Track borrowing records with book references, quantities, and due dates.

  - Automatically deduct borrowed quantities from book copies and update availability.

- Aggregation Pipeline:

  - Generate a summary of borrowed books, including total quantities borrowed per book with title and ISBN details.

- Mongoose Enhancements:

  - Custom instance method (updateAvailability) to manage book availability.

  - Pre-save middleware to enforce business logic (e.g., availability checks, copy deductions).

  - Schema validation for required fields, enums (e.g., genres), and minimum values.

- TypeScript Support:

  - Strongly typed models, controllers, and routes for type safety.

  - Proper error handling with consistent response formats.

- API Endpoints:

  - POST /api/books: Create a new book.

  - GET /api/books: Retrieve all books with filtering, sorting, and pagination.

  - GET /api/books/:bookId: Get a specific book by ID.

  - PUT /api/books/:bookId: Update a book’s details.

  - DELETE /api/books/:bookId: Delete a book.

  - POST /api/borrow: Borrow a book with quantity and due date.

  - GET /api/borrow: Retrieve a summary of borrowed books.

- Error Handling:

  - Consistent error responses with success: false, detailed messages, and error objects.

  - Validation errors for invalid inputs (e.g., negative copies, invalid genres).

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- Node.js (v16 or later): Download Node.js

- MongoDB: Either a local MongoDB instance or a MongoDB Atlas cluster. Install MongoDB or Set up MongoDB Atlas.

- npm: Comes with Node.js, used for package management.

- Git: For cloning the repository. Install Git.

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository:

`git clone <repository-url>
cd library-management-system`

### 2. Install Dependencies:

Run the following command to install all required dependencies:

`npm install`

### 3. Configure Environment Variables:

Create a .env file in the project root and add the following:

`MONGO_URI=mongodb://localhost:27017/library
PORT=5000`

- Replace MONGO_URI with your MongoDB connection string (e.g., mongodb://localhost:27017/library for a local instance or a MongoDB Atlas URI).

- Adjust PORT if needed (defaults to 3000).

### 4. Set Up MongoDB:

If using a local MongoDB instance, ensure MongoDB is running:

`mongod`

If using MongoDB Atlas, ensure your IP is whitelisted and the cluster is accessible.

### 5. Compile TypeScript:

Compile the TypeScript code to JavaScript:

`npm run build`

### 6. Run the Application:

Start the server in production mode:

`npm run prod`

Alternatively, for development with live reloading:

`npm run dev`

### 7. Test the API:

The API will be available at http://localhost:5000. Use a tool like Postman or cURL to test the endpoints. Example requests:

- Create a book:

`curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{
"title": "The Theory of Everything",
"author": "Stephen Hawking",
"genre": "SCIENCE",
"isbn": "9780553380163",
"description": "An overview of cosmology and black holes.",
"copies": 5,
"available": true
}'`

Borrow a book:
`
curl -X POST http://localhost:3000/api/borrow -H "Content-Type: application/json" -d '{
"book": "<book-id>",
"quantity": 2,
"dueDate": "2025-07-18T00:00:00.000Z"
}'`

Get borrowed books summary:

`curl http://localhost:5000/api/borrow`

## Available Scripts

- npm run build: Compiles TypeScript to JavaScript (outputs to dist/).

- npm run prod: Runs the compiled JavaScript application.

- npm run dev: Runs the application in development mode with ts-node-dev.

## Notes

- Ensure MongoDB is running before starting the application.

- The API follows strict response formats as specified, with proper error handling for validation and business logic errors.

- TypeScript ensures type safety across models, controllers, and routes.

- For production, consider adding authentication, rate limiting, and environment-specific configurations.
