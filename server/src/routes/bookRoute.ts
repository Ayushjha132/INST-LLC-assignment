import express from "express";
import { getAllBooks, addBook, deleteBookById } from "../controllers/bookControllers";

const router = express.Router();

// GET /books
router.get("/", getAllBooks);

// POST /books
router.post("/", addBook);

// DELETE /books/:id
// @ts-ignore
router.delete('/:id', deleteBookById);


export default router;
