import express from "express";
import * as bookController from "../controllers/book.controller";

const router = express.Router();

// all routes
router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/:bookId", bookController.getBookById);
router.put("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);

export default router;
