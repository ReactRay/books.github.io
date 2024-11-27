
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

    bookService.get(bookid).then((book) => {
      setBook(book)

    })
  }

  function checkDate() {
    const publishedDate = new Date(book.publishedDate);
    const currentDate = new Date();
    const timeDifference = currentDate - publishedDate;
    const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years

    if (yearsDifference > 10) {
      return "Vintage";
    } else if (yearsDifference < 1) {
      return "New";
    }
    return ''; // No text for other cases
  }


  if (!book) return <h1>Loading...</h1>

  return (
    <div className="container">
      <h1 className="book-title">Book: {book.title}</h1>
      <div style={{ position: 'relative' }}>
        {book.listPrice.isOnSale && <span className="sale">On Sale!</span>}

        <div className="book-details-box">
          <h3 className="section-title">About this book:</h3>
          <p className="book-description">{book.description}</p>

          <div className="book-meta">
            <h4 className="meta-title">Authors:</h4>
            <p className="meta-content">{book.authors.join(', ')}</p>

            <h4 className="meta-title">Categories:</h4>
            <p className="meta-content">{book.categories.join(', ')}</p>

            <h4 className="meta-title">Published Date:</h4>
            <p className="meta-content">{new Date(book.publishedDate).toLocaleDateString()} <span className="span">{checkDate()}</span></p>

            <h4 className="meta-title">Language:</h4>
            <p className="meta-content">{book.language}</p>

            <h4 className="meta-title">Page Count:</h4>
            <p className="meta-content">{book.pageCount}<span className="span"> {book.pageCount > 500 ? 'Serious Reading' : book.pageCount > 200 ? 'Decent Reading' : book.pageCount < 100 ? 'Light Reading' : ''}</span></p>
          </div>

          <div className="book-price">
            <h4 >Price:</h4>
            <p><span className={book.listPrice.amount > 150 ? 'red' : book.listPrice.amount < 20 ? 'green' : ''}>{book.listPrice.amount} </span>{book.listPrice.currencyCode}</p>
            {book.listPrice.isOnSale && <span className="sale-tag">On Sale!</span>}
          </div>
          <div className="book-image">
            <img src={`../assets/BooksImages/${book.imgNum}.jpg`} alt={book.title} className="book-img" />

          </div>
          <div className="btn-box">
            <Link to={'/book'} className="go-back-btn">Go back</Link>
          </div>
        </div>



      </div>
    </div>
  )
}