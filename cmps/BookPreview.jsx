
const { useNavigate } = ReactRouterDOM;


export function BookPreview({ book, removeBook, imgNum }) {

  const navigate = useNavigate()
  return (
    <div className="book-box">

      <h5 className="font">Name: {book.title}</h5>
      <h5>Desc: {book.description}</h5>
      <h5>
        <span className="price">
          Price: {book.listPrice && book.listPrice.amount}{book.listPrice && book.listPrice.currencyCode}
        </span>
      </h5>
      {/* <img src={`https://picsum.photos/id/${book.imgNum + 100}/200/300`} alt={book.title} className="book-img" /> */}
      <img src={`../assets/BooksImages/${book.imgNum}.jpg`} alt={book.title} className="book-img" />
      <div className="btn-box">
        <button className='btn' onClick={() => navigate(`/book/bookdetails/${book.id}`)}>select book</button>
        <button className='btn' onClick={() => removeBook(book.id)}>Remove Book</button>
        <button className='btn' onClick={() => navigate(`/book/add/${book.id}`)}>edit Book</button>
      </div>
    </div >
  );
}
