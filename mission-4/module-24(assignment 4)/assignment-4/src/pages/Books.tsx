import BookTable from "../components/BookTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Books() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
        <BookTable />
        <Footer />
      </main>
    </div>
  );
}
