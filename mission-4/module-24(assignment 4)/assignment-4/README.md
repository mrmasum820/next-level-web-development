# Library Management System

## Project Overview

The Library Management System is a minimalist, client-side web application built with React, TypeScript, Redux Toolkit Query (RTK Query), and Tailwind CSS. It allows users to manage books, perform CRUD operations, borrow books, and view a borrow summary without requiring authentication. The application interacts with a RESTful API to handle book and borrowing data, emphasizing clean UI, responsive design, and efficient state management.
The project integrates with a backend API hosted at:

- Book API: https://libeary-mng-api.vercel.app/api/book
- Borrow API: https://libeary-mng-api.vercel.app/api/borrow

## Features

### 1. Public Routes:

All pages are accessible without login or authentication.
Navigation includes links to All Books, Add Book, and Borrow Summary.

### 2. Book Management:

- Book List: Displays books in a table with columns for Title, Author, Genre, ISBN, Copies, Availability, and Actions.
- Actions:

  - Edit Book: Opens a form pre-filled with book data for updates, submitted via API with instant UI refresh.
  - Delete Book: Triggers a confirmation dialog before removal.
  - Borrow Book: Opens a form to borrow a book (if available).
  - Add Book: Form to create a new book with fields for Title, Author, Genre, ISBN, Description, Copies, and Availability (defaults to true).

- Business Logic:

Books with zero copies are marked unavailable.
Updates reflect immediately in the UI.

### 3. Borrow Book:

Form with fields for Quantity and Due Date.

- Business Logic:
  - Quantity cannot exceed available copies.
  - Books become unavailable when copies reach zero.
  - Success message shown, redirects to Borrow Summary.

### 4. Borrow Summary:

- Displays a table of borrowed books with Book Title, ISBN, and Total Quantity Borrowed.
- Data retrieved from an aggregation API.

### 5. UI/UX:

- Minimalist, responsive design using Tailwind CSS.
- Easy navigation with a navbar and footer.
- Toast notifications for success/error messages.
- Confirmation dialogs for critical actions (e.g., delete).

### 6. Bonus Features:

- Optimistic UI updates via RTK Query.
- Toast notifications using react-toastify.
- Fully responsive layout for mobile, tablet, and desktop.
- Type-safe forms with TypeScript.

### 7. Technology Stack

Layer
Technology

Frontend
React + TypeScript

State Management
Redux Toolkit + RTK Query

Styling
Tailwind CSS

Build Tool
Vite

## Credits

Built by Developer Madina using React, TypeScript, Redux Toolkit Query, and Tailwind CSS. Inspired by minimalist library management systems for UI and architecture.
