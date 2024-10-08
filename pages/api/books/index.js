import connectMongo from '../../../lib/mongodb';
import Book from '../../../lib/models/Book';

export default async function handler(req, res) {
  await connectMongo();  // Connexion à MongoDB

  try {
    if (req.method === 'GET') {
      // Récupérer tous les livres
      const books = await Book.find({});
      res.status(200).json(books);
    } else if (req.method === 'POST') {
      // Ajouter un livre
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } else if (req.method === 'DELETE') {
      // Supprimer un livre par ID
      const { id } = req.body;  // Récupère l'ID du corps de la requête
      await Book.findByIdAndDelete(id);
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in /api/books:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
