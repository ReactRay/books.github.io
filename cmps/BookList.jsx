import { BookPreview } from './BookPreview.jsx'

const { Link } = ReactRouterDOM

export function BookList({ books, removeBook }) {
  return (
    <div >
      <div className="book-flex">
        {books.map((book, idx) => (
          <div key={book.id} className="book-item">
            <BookPreview book={book} removeBook={removeBook} imgNum={book.imgNum} />



          </div>
        ))}

      </div>
    </div>
  )
}
