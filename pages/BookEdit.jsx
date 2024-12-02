const { useState, useEffect } = React;
const { useNavigate, Link, useParams } = ReactRouterDOM;
import { bookService } from "../services/book.service.js";

export function BookEdit() {
  const [book, setBook] = useState(bookService.getEmptyBook);

  const navigate = useNavigate();
  const params = useParams();
  const bookid = params.bookid;

  useEffect(() => {
    if (bookid) {
      loadBook(bookid);
    }
  }, [bookid]);

  function handleChange({ target }) {
    const { name, value, type, checked } = target;
    const newValue = type === "checkbox" ? checked : value;

    setBook((prev) => {
      if (name in prev.listPrice) {
        return {
          ...prev,
          listPrice: { ...prev.listPrice, [name]: newValue },
        };
      }
      return {
        ...prev,
        [name]: newValue,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fullBook = {
      ...book,
      authors: book.authors.split(",").map((author) => author.trim()),
      categories: book.categories.split(",").map((category) => category.trim()),
    };

    bookService.save(fullBook).then(() => navigate("/book"));
  }

  function loadBook(bookid) {
    bookService.get(bookid).then((myBook) => {
      setBook({
        ...myBook,
        authors: myBook.authors.join(", "),
        categories: myBook.categories.join(", "),
        listPrice: myBook.listPrice || {
          amount: "",
          currencyCode: "EUR",
          isOnSale: false,
        },
      });
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
            value={book.listPrice.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Currency Code:</label>
          <input
            type="text"
            name="currencyCode"
            value={book.listPrice.currencyCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Is On Sale:</label>
          <input
            type="checkbox"
            name="isOnSale"
            checked={book.listPrice.isOnSale}
            onChange={handleChange}
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