import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./app/routes/book.routes";
import borrowRoutes from "./app/routes/borrow.routes";

dotenv.config();

export const app: Application = express();

app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System");
});

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.errors || err,
  });
});
