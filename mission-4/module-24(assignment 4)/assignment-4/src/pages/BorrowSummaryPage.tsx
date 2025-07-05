import BorrowSummary from "../components/BorrowSummary";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BorrowSummaryPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
        <BorrowSummary />
      </main>
      <Footer />
    </div>
  );
}
