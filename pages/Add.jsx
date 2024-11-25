const { useState, useEffect } = React
const { useNavigate, Link, useParams } = ReactRouterDOM
import { bookService } from '../services/book.service.js'

export function Add() {
  const [book, setBook] = useState(bookService.getEmptyBook)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (bookid) {
      loadBook(bookid)
    }
  }, [])

  const bookid = params.bookid

  function handleSubmit(e) {
    e.preventDefault()
    console.log(book, 'test')
    bookService.save(book).then(() => navigate('/book'))
  }

  function loadBook(bookid) {
    const cleanBookId = bookid.replace(':', '') // Clean the colon
    bookService.get(cleanBookId).then((book) => {
      setBook(book)
    })
  }

  return (
    <div className="container">
      <h1>{bookid ? 'Edit' : 'Add'} a new </h1>

      <form className="book-flex" onSubmit={handleSubmit}>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={book.bookName}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, bookName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Book Description:</label>
          <input
            type="text"
            name="bookDesc"
            value={book.bookDesc}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, bookDesc: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="bookPrice"
            value={book.bookPrice}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, bookPrice: e.target.value }))
            }
          />
        </div>
        <div>
          <button type="submit" className='btn'>
            {bookid ? 'edit book' : 'add a new book'}
          </button>

          <Link to={'/book'}>cancel</Link>

        </div>
      </form>
    </div>
  )
}
