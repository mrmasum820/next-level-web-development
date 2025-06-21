import { Request, Response } from "express";
import { IBorrow } from "../interfaces/borrow.interface";
import Borrow from "../models/borrow.model";

// create a borrow
export const borrowBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const borrow: IBorrow = await Borrow.create(req.body);

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
};

export const getBorrowedSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  const summary = await Borrow.aggregate([
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
};
