
const { useState, useEffect } = React;
const { Link, useParams } = ReactRouterDOM;
import { bookService } from "../services/book.service.js";

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

  if (!book) return <h1>Loading...</h1>

  return (
    <div className="container">
      <h1 className="book-title">Book: {book.title}</h1>
      <div>
        <div className="book-details-box">
          <h3 className="section-title">About this book:</h3>
          <p className="book-description">{book.description}</p>

          <div className="book-meta">
            <h4 className="meta-title">Authors:</h4>
            <p className="meta-content">{book.authors.join(', ')}</p>

            <h4 className="meta-title">Categories:</h4>
            <p className="meta-content">{book.categories.join(', ')}</p>

            <h4 className="meta-title">Published Date:</h4>
            <p className="meta-content">{new Date(book.publishedDate).toLocaleDateString()}</p>

            <h4 className="meta-title">Language:</h4>
            <p className="meta-content">{book.language}</p>

            <h4 className="meta-title">Page Count:</h4>
            <p className="meta-content">{book.pageCount}</p>
          </div>

          <div className="book-price">
            <h4 >Price:</h4>
            <p >{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            {book.listPrice.isOnSale && <span className="sale-tag">On Sale!</span>}
          </div>
          <div className="book-image">
            <img
              src={`https://picsum.photos/id/${book.imgNum + 30}/200/300`}
              alt={book.title}
              className="book-img"
            />
          </div>
          <div className="btn-box">
            <Link to={'/book'} className="go-back-btn">Go back</Link>
          </div>
        </div>



      </div>
    </div>
  )
}