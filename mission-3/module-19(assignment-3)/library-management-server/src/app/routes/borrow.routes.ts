import express from "express";
import * as borrowController from "../controllers/borrow.controller";

const router = express.Router();

// post and get routes
router.post("/", borrowController.borrowBook);
router.get("/", borrowController.getBorrowedSummary);

export default router;
