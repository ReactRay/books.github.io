import { bookService } from '../services/book.service.js'
const { Link } = ReactRouterDOM

export function BookPreview({ book, removeBook, imgNum }) {
  return (
    <div className="book-box">
      <h2>Name: {book.bookName}</h2>
      <h3>Desc: {book.bookDesc}</h3>
      <h3>
        <span className="price">Price: {book.bookPrice}$</span>
      </h3>
      <img src={`../assets/BooksImages/${imgNum + 1}.jpg`} />
      <div className="btn-box">

        <Link className='nav' to={`/book/bookdetails/${book.id}`}>select book</Link>

        <button className='btn' onClick={() => removeBook(book.id)}>Remove Book</button>

        <Link className='nav' to={`/book/add/${book.id}`}>edit Book</Link> (Todo)

      </div>
    </div>
  )
}
