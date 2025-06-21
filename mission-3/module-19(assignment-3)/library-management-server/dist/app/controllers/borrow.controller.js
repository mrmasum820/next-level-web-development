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
exports.getBorrowedSummary = exports.borrowBook = void 0;
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrow = yield borrow_model_1.default.create(req.body);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
});
exports.borrowBook = borrowBook;
const getBorrowedSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo",
            },
        },
        {
            $unwind: "$bookInfo",
        },
        {
            $project: {
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn",
                },
                totalQuantity: 1,
            },
        },
    ]);
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
    });
});
exports.getBorrowedSummary = getBorrowedSummary;
