import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useGetBookQuery, useUpdateBookMutation } from "../api/bookApi";
import type { BookFormData } from "../types";

export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useGetBookQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const handleSubmit = async (data: BookFormData) => {
    await updateBook({ id, book: data });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        {book && <BookForm initialData={book} onSubmit={handleSubmit} />}
      </main>
      <Footer />
    </div>
  );
}
