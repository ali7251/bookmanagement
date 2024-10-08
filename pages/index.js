import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/api/books');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, description };

    try {
      const res = await axios.post('/api/books', newBook);
      setBooks([...books, res.data]);
      setTitle('');
      setAuthor('');
      setGenre('');
      setDescription('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete('/api/books', { data: { id } });
      setBooks(books.filter((book) => book._id !== id));  // Met à jour la liste des livres sans celui supprimé
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Book Management System</h1>

      <form className="mb-5" onSubmit={addBook}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="col">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Book</button>
      </form>

      <h2>Books List</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{book.title}</h5>
              <p>{book.author} - {book.genre}</p>
              <p>{book.description}</p>
            </div>
            <button onClick={() => deleteBook(book._id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
