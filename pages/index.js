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
      const res = await axios.get('/api/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, description };
    const res = await axios.post('/api/books', newBook);
    setBooks([...books, res.data]);
    setTitle('');
    setAuthor('');
    setGenre('');
    setDescription('');
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete('/api/books', { data: { id } });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting the book", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 display-4 text-primary">Book Management System</h1>

      <form className="mb-5 p-4 bg-light rounded shadow-sm" onSubmit={addBook} style={{ transition: 'all 0.3s ease-in-out' }}>
        <h2 className="mb-4 text-secondary">Add a New Book</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
          </div>
          <div className="col-md-6">
            <textarea
              className="form-control form-control-lg shadow-sm"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6', transition: 'all 0.3s ease-in-out' }}
        >
          Add Book
        </button>
      </form>

      <h2 className="mb-4 text-secondary">Books List</h2>
      {books.length > 0 ? (
        <ul className="list-group">
          {books.map((book, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-start p-4 mb-3 shadow-sm rounded"
              style={{ transition: 'all 0.3s ease-in-out' }}
            >
              <div>
                <h5 className="mb-2 text-dark">{book.title}</h5>
                <p className="mb-1 text-muted">{book.author} - {book.genre}</p>
                <p className="text-secondary">{book.description}</p>
              </div>
              <button
                className="btn btn-danger btn-sm align-self-start shadow-sm"
                onClick={() => deleteBook(book._id)}
                style={{ transition: 'all 0.3s ease-in-out' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No books available. Please add a book.</p>
      )}
    </div>
  );
}
