
const { useState, useEffect } = React;
const { Link, useParams } = ReactRouterDOM;
import { reviewService } from "../services/reviews.service.js";
import { bookService } from "../services/book.service.js";
import { ReviewsForm } from "../cmps/ReviewsForm.jsx";
import { Reviews } from "../cmps/Reviews.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookDetails() {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const params = useParams();

  useEffect(() => {

    loadBook(params.bookid);
    console.log('render in effect1')

  }, [params.bookid]);

  useEffect(() => {
    console.log('render in effect 2')
    loadReviews(params.bookid)
  }, [])

  console.log('render')

  function loadBook(bookid) {
    bookService.get(bookid).then(setBook);
  }

  function loadReviews(bookid) {
    reviewService.query(bookid).then(setReviews);
  }

  function addToReviews(review) {
    reviewService.post(review).then((review) =>
      setReviews((prev) => [...prev, review])
    );
  }

  function removeReview(reviewId) {
    reviewService.remove(reviewId).then(() => setReviews((prev) => prev.filter(review => review.id !== reviewId)))
  }

  function checkDate() {
    if (!book) return "";
    const publishedDate = new Date(book.publishedDate);
    const currentDate = new Date();
    const yearsDifference =
      (currentDate - publishedDate) / (1000 * 60 * 60 * 24 * 365);

    if (yearsDifference > 10) {
      return "Vintage";
    } else if (yearsDifference < 1) {
      return "New";
    }
    return "";
  }

  if (!book) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1 className="book-title">{book.title}</h1>
      <div className="book-info">
        <div>
          <h3>Subtitle: {book.subtitle}</h3>
          <h3>Authors: {book.authors.join(", ")}</h3>
          <h3>
            Publish Year: {book.publishedDate.substring(0, 4)}{" "}
            <span className="span">{checkDate()}</span>
          </h3>

          <h3>Categories: {book.categories.join(", ")}</h3>
          <h3>Page Count: {book.pageCount} <span className="span">{book.pageCount > 500 ? 'Serious Reading ' : book.pageCount > 200 ? 'Decent Reading' : book.PageCount < 100 ? ' Light Reading' : ''}</span></h3>
          <h3>Language: {book.language}</h3>
          <h2>
            Price: {book.listPrice.amount}
            {book.listPrice.currencyCode}
          </h2>
          {book.listPrice.isOnSale && <h2 className="red">ON SALE!</h2>}
          <LongTxt txt={book.description} length={20} />
        </div>
        <img src={`https://picsum.photos/id/${book.imgNum + 33}/200/300`} alt={book.title} className="book-img" />

        {/* <img
          src={`../assets/BooksImages/${book.imgNum}.jpg`}
          alt="Book cover"

        /> */}

        <div className="btn-flex">
          <Link to={`/book/bookdetails/${book.prevbookId}`}>Previous Book</Link>

          <Link to={`/book/bookdetails/${book.nextbookId}`}>Next Book</Link>
        </div>
      </div>

      <ReviewsForm addToReviews={addToReviews} bookId={params.bookid} />
      <Reviews reviews={reviews} removeReview={removeReview} />
    </div>
  );
}