"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_routes_1 = __importDefault(require("./app/routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./app/routes/borrow.routes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// Routes
exports.app.use("/api/books", book_routes_1.default);
exports.app.use("/api/borrow", borrow_routes_1.default);
// Error Handling
exports.app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.errors || err,
    });
});
