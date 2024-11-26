const { useState, useEffect } = React;
const { useNavigate, Link, useParams } = ReactRouterDOM;
import { bookService } from "../services/book.service.js";

export function Add() {
  const [book, setBook] = useState(() => ({
    id: "",
    title: "",
    subtitle: "",
    authors: "",
    publishedDate: "",
    description: "",
    pageCount: "",
    categories: "",
    imgNum: Math.floor(Math.random() * 20) + 1,
    language: "",
    listPrice: null,
  }));

  const [listPrice, setListPrice] = useState({
    amount: "",
    currencyCode: "EUR",
    isOnSale: false,
  });

  const navigate = useNavigate();
  const params = useParams();
  const bookid = params.bookid;

  useEffect(() => {
    if (bookid) {
      loadBook(bookid);

      console.log(bookid)
    }
  }, [bookid]);

  function handleChange({ target }) {

    const { name, value } = target;

    setBook((prev) => ({ ...prev, [name]: value }));
  }

  function handleListPriceChange({ target }) {
    const { name, value, type, checked } = target;

    const val = type === "checkbox" ? checked : value;

    setListPrice((prev) => ({ ...prev, [name]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const preparedBook = {
      ...book,
      authors: book.authors.split(",").map((author) => author.trim()),
      categories: book.categories.split(",").map((category) => category.trim()),
      listPrice,
    };


    bookService.save(preparedBook).then(() => navigate("/book"));
  }

  function loadBook(bookid) {
    const cleanBookId = bookid.replace(":", "");
    bookService.get(cleanBookId).then((loadedBook) => {
      setBook({
        ...loadedBook,
        authors: loadedBook.authors.join(", "),
        categories: loadedBook.categories.join(", "),
      });
      setListPrice(loadedBook.listPrice || listPrice);
    });
  }

  return (
    <div className="container">
      <h1>{bookid ? "Edit" : "Add"} a New Book</h1>
      <form className="book-flex" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subtitle:</label>
          <input
            type="text"
            name="subtitle"
            value={book.subtitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Authors (comma-separated):</label>
          <textarea
            name="authors"
            value={book.authors}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Published Date:</label>
          <input
            type="date"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Page Count:</label>
          <input
            type="number"
            name="pageCount"
            value={book.pageCount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categories (comma-separated):</label>
          <textarea
            name="categories"
            value={book.categories}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={book.language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="amount"
            value={listPrice.amount}
            onChange={handleListPriceChange}
          />
        </div>
        <div>
          <label>Currency Code:</label>
          <input
            type="text"
            name="currencyCode"
            value={listPrice.currencyCode}
            onChange={handleListPriceChange}
          />
        </div>
        <div>
          <label>Is On Sale:</label>
          <input
            type="checkbox"
            name="isOnSale"
            checked={listPrice.isOnSale}
            onChange={handleListPriceChange}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            {bookid ? "Edit Book" : "Add New Book"}
          </button>
          <Link to="/book">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
