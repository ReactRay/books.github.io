const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { Filter } from '../cmps/Filter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { getTruthyValues } from '../services/util.service.js'

export function BookIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bookService.getFilterFromSrcParams(searchParams));
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setSearchParams(getTruthyValues(filterBy))
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