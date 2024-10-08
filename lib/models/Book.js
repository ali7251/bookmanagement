import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
});

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

export default Book;
