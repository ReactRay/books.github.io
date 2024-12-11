const { useState, useRef } = React;
import { debounce } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"



export function GoogleBook({ addBook, allBooks }) {
    //   const [input, setInput] = useState('');
    const [books, setBooks] = useState([]);


    const debouncedSearch = useRef(debounce(handleChange, 1200)).current;

    function handleAddBook(book) {
        bookService.checkIfExists(book, allBooks).then((exists) => {
            if (!exists) {
                showErrorMsg('book already exist');
            } else {
                bookService.post2(book).then(() => {
                    addBook(book); // function from father state (index)
                    console.log(book);
                    showSuccessMsg('book was added');
                });
            }
        }).catch(err => {
            showErrorMsg('Error');
            console.error(err);
        });
    }

    function handleChange(input) {
        bookService.getBooksFromGoogle(input)
            .then(books => {
                console.log('from cmp:', books);

                setBooks(books || [])
            })
        // if (!input) return;
        // const response = await fetch(
        //     `https://www.googleapis.com/books/v1/volumes?q=${input.replace(' ', '+')}&key=AIzaSyABKAw_tIhDuZxOe9kthccDWlEjy2oa8F0`
        // );
        // const data = await response.json();
        // setBooks(data.items || []);
        // console.log(data.items);
    }

    return (
        <div className="container google-container">
            <h2> Google things happen here ⬇️</h2>
            <input
                type="text"
                // value={input}
                onChange={(e) => {
                    // setInput(e.target.value);
                    debouncedSearch(e.target.value);
                }}
                placeholder="Search for books"
            />


            {books.length && (
                <ul className="google-books">
                    {books.length ? (
                        books.map((book) => (
                            <li className="googleBook-item" key={book.id}>
                                <strong>{book.title}</strong>
                                <button onClick={() => handleAddBook(book)}>Add Book</button>
                            </li>
                        ))
                    ) : (
                        <p>No books found or available for sale.</p>
                    )}
                </ul>
            )}
        </div>
    );
}