
const { useNavigate } = ReactRouterDOM;


export function BookPreview({ book, removeBook, imgNum }) {

  const navigate = useNavigate()
  return (
    <div className="book-box">
      <h1 className="font">Name: {book.title}</h1>
      <h3>Desc: {book.description}</h3>
      <h3>
        <span className="price">
          Price: {book.listPrice && book.listPrice.amount}{book.listPrice && book.listPrice.currencyCode}
        </span>
      </h3>
      <img src={`https://picsum.photos/id/${book.imgNum + 30}/200/300`} alt={book.title} className="book-img" />
      <div className="btn-box">
        <button className='btn' onClick={() => navigate(`/book/bookdetails/${book.id}`)}>select book</button>
        <button className='btn' onClick={() => removeBook(book.id)}>Remove Book</button>
        <button className='btn' onClick={() => navigate(`/book/add/${book.id}`)}>edit Book</button>
      </div>
    </div >
  );
}
