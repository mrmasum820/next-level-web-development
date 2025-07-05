import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { BookFormData } from "../types";

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
}

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookFormData>(
    initialData || {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success("Book saved successfully!");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to save book");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Copies</label>
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          min="0"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
