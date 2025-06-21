import { Request, Response } from "express";
import { IBook } from "../interfaces/book.interface";
import Book from "../models/book.model";

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book: IBook = await Book.create(req.body);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
};

// get all books
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;

  let query = Book.find();

  if (filter) {
    query = query.where("genre").equals(filter);
  }

  const books = await query
    .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};

// get a single book
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};

// update a book
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw new Error("Book not found");
  }
  await book.updateAvailability();
  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
};

// delete a book
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findByIdAndDelete(req.params.bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
};
