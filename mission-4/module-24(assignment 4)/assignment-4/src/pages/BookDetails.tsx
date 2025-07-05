import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../api/bookApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {book && (
          <div>
            <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <p>
              <strong>Copies:</strong> {book.copies}
            </p>
            <p>
              <strong>Available:</strong> {book.available ? "Yes" : "No"}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
