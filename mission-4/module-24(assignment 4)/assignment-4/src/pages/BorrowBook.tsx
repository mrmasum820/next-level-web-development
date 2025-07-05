import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../api/bookApi";
import BorrowForm from "../components/BorrowForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBorrowBookMutation } from "../api/borrowApi";
import type { BorrowFormData } from "../types";

export default function BorrowBook() {
  const { bookId } = useParams();
  const { data: book } = useGetBookQuery(bookId);
  const [borrowBook] = useBorrowBookMutation();

  const handleSubmit = async (data: BorrowFormData) => {
    await borrowBook({ bookId, borrow: data });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
        {book && <BorrowForm book={book} onSubmit={handleSubmit} />}
      </main>
      <Footer />
    </div>
  );
}
