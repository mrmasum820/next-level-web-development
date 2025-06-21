"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
// import Book, { IBook } from '../models/Book';
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.create(req.body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
    });
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;
    let query = book_model_1.default.find();
    if (filter) {
        query = query.where("genre").equals(filter);
    }
    const books = yield query
        .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
        .limit(Number(limit));
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(req.params.bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!book) {
        throw new Error("Book not found");
    }
    yield book.updateAvailability();
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findByIdAndDelete(req.params.bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
});
exports.deleteBook = deleteBook;
