const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { Filter } from '../cmps/Filter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { getTruthyValues } from '../services/util.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { GoogleBook } from '../cmps/GoogleBook.jsx'


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
    bookService.query(filterBy).then(books => {
      setBooks(books)
      showSuccessMsg('loaded succesfully')
    }).catch(() => {
      showErrorMsg('failed to load books')
    }

    );
  }

  function addGoogleBook(book) {
    setBooks((prev) => [book, ...prev])
  }

  function removeBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prev) => prev.filter((book) => book.id !== bookId))
        showSuccessMsg('book deleted successfully')
      }).catch(() => {
        console.log('something went wrong')
        showErrorMsg('failed to delete book')
      }

      )
  }

  console.log('from index:', books);


  if (!books.length) return <div>Loding books</div>
  return (
    <div >
      <Filter filterBy={filterBy} onFilter={handleFilterChange} />
      <GoogleBook addBook={addGoogleBook} allBooks={books} />
      <BookList books={books} removeBook={removeBook} />
    </div>
  );
}