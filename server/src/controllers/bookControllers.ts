import { Request, Response } from 'express';
import Book from '../models/book';

interface BookDocument {
  _id: string;
  title: string;
  author: string;
  description?: string;
}


// GET /books - Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /books - Add a new book
export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description } = req.body;
    const newBook = new Book({ title, author, description });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE 
export const deleteBookById = async (req: Request, res: Response):Promise<Response<any, Record<string, any>> | undefined> => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({   
 message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);   
 // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};