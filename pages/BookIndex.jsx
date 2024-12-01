const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { Filter } from '../cmps/Filter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

export function BookIndex() {
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function handleFilterChange(newFilter) {
    setFilterBy(newFilter);
  }

  function loadBooks() {
    bookService.query(filterBy).then(setBooks);
  }

  function removeBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => setBooks((prev) => prev.filter((book) => book.id !== bookId)))
  }

  console.log(books);


  if (!books.length) return <div>Loding books</div>
  return (
    <div >

      <Filter filterBy={filterBy} onFilter={handleFilterChange} />
      <BookList books={books} removeBook={removeBook} />
    </div>
  );
}