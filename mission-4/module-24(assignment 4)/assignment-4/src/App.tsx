import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}
