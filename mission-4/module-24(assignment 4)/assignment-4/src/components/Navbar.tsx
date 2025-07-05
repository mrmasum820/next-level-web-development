import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold mr-2">
          Library Management
        </h1>
        <div className="space-x-4">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "font-bold" : ""}`
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "font-bold" : ""}`
            }
          >
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
