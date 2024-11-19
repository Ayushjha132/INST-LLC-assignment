import mongoose, { Document, Schema } from "mongoose";

// Define the interface for Book
export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
}

// Define the schema
const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the model
const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
