import connectMongo from '../../../lib/mongodb';
import Book from '../../../lib/models/Book';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'GET') {
    const books = await Book.find();
    res.status(200).json(books);
  } else if (req.method === 'POST') {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } else if (req.method === 'DELETE') {
    const { id } = req.body; // Assure-toi d'envoyer l'id du livre à supprimer
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
