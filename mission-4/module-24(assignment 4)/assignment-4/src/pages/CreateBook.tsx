import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCreateBookMutation } from "../api/bookApi";
import type { BookFormData } from "../types";

export default function CreateBook() {
  const [createBook] = useCreateBookMutation();

  const handleSubmit = async (data: BookFormData) => {
    await createBook(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
        <BookForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  );
}
