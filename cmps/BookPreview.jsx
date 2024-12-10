

import { LongTxt } from "./LongTxt.jsx";
const { useNavigate } = ReactRouterDOM;


export function BookPreview({ book, removeBook, imgNum }) {

  function hasImage(book) {
    if (book.image) {
      return book.image
    }
    return `../assets/BooksImages/${book.imgNum}.jpg`
  }

  const navigate = useNavigate()
  return (
    <div className="book-box "  >
      <div>
        <h5 className="font"> {book.title}</h5>
        <LongTxt txt={book.description} />
        <h5>
          <span className="price">
            {book.listPrice && book.listPrice.amount}{book.listPrice && book.listPrice.currencyCode}
          </span>
        </h5>
        {/* <img src={`https://picsum.photos/id/${book.imgNum + 33}/200/300`} alt={book.title} className="book-img" /> */}
        <img src={hasImage(book)} alt={book.title} className="book-img" />
        {book.listPrice.isOnSale && <h4 className="red">ON SALE!</h4>}
      </div>
      <div className="btn-box fly">
        <button onClick={() => navigate(`/book/bookdetails/${book.id}`)}>select book</button>
        <button onClick={() => removeBook(book.id)}>Remove Book</button>
        <button onClick={() => navigate(`/book/bookedit/${book.id}`)}>edit Book</button>
      </div>
    </div >
  );
}
