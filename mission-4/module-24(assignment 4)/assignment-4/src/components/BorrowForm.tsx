import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Book, BorrowFormData } from "../types";

interface BorrowFormProps {
  book: Book;
  onSubmit: (data: BorrowFormData) => Promise<void>;
}

export default function BorrowForm({ book, onSubmit }: BorrowFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BorrowFormData>({
    quantity: 1,
    dueDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.quantity > book.copies) {
      toast.error("Quantity exceeds available copies");
      return;
    }
    try {
      await onSubmit(formData);
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <h3 className="text-lg">Borrow: {book.title}</h3>
        <p>Available Copies: {book.copies}</p>
      </div>
      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          max={book.copies}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Borrow
      </button>
    </form>
  );
}
