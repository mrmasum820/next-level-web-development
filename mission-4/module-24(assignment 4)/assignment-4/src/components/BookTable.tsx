import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery, useDeleteBookMutation } from "../api/bookApi";
import ConfirmationDialog from "./ConfirmationDialog";

export default function BookTable() {
  const { data: books, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedBookId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedBookId) {
      await deleteBook(selectedBookId);
      setIsDialogOpen(false);
      setSelectedBookId(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Copies</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-2 border">
                <Link
                  to={`/books/${book._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.title}
                </Link>
              </td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">
                {book.available ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                {book.available && (
                  <Link
                    to={`/borrow/${book._id}`}
                    className="text-green-600 hover:underline"
                  >
                    Borrow
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this book?"
      />
    </div>
  );
}
