const { useState, useRef } = React;
import { debounce } from "../services/util.service.js";


export function GoogleBook({ bookService, addBook }) {
    const [input, setInput] = useState('');
    const [books, setBooks] = useState([]);

    const debouncedSearch = useRef(debounce(handleChange, 1200)).current;

    function handleAddBook(book) {
        const newBook = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || ['Unknown Author'],
            image: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description || 'No description available.',
            categories: book.volumeInfo.categories || ['Uncategorized'],
            imgNum: Math.floor(Math.random() * 20) + 1,
            language: book.volumeInfo.language || 'en',
            pageCount: book.volumeInfo.pageCount,
            subtitle: book.volumeInfo.subtitle || ' books from google dont have that so here is some random test by silly Radwan :D',
            listPrice: {
                amount: (Math.random() * (30 - 5) + 5).toFixed(2),
                currencyCode: Math.random() < 0.5 ? 'EUR' : '$',
                isOnSale: Math.random() < 0.5,
            },
        };

        bookService.post2(newBook).then(() => addBook(newBook));

        setInput('');
        console.log(newBook);
    }


    async function handleChange(input) {
        if (!input) return;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${input.replace(' ', '+')}&key=AIzaSyABKAw_tIhDuZxOe9kthccDWlEjy2oa8F0`
        );
        const data = await response.json();
        setBooks(data.items || []);
        console.log(data.items);
    }

    return (
        <div className="container google-container">
            <h2> Google things happen here ⬇️</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    debouncedSearch(e.target.value);
                }}
                placeholder="Search for books"
            />


            {input && (
                <ul className="google-books">
                    {books.length ? (
                        books.map((book) => (
                            <li className="googleBook-item" key={book.id}>
                                <strong>{book.volumeInfo.title}</strong>
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