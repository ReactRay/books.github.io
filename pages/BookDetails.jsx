const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()

  useEffect(() => {
    loadBook(params.bookid)
  }, [params.bookid])

  function loadBook(bookid) {
    const cleanBookId = bookid.replace(':', '') // Clean the colon
    bookService.get(cleanBookId).then((book) => {
      setBook(book)
    })
  }

  if (!book) return <h1>loading...</h1>

  return (
    <div className="container">
      <h1>Book: {book.bookName}</h1>
      <h3>about this book : {book.bookDesc}</h3>

      <Link to={'/book'}>go back</Link>

    </div>
  )
}
