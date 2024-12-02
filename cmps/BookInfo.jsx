const { useState, useEffect } = React;
const { Link, useParams } = ReactRouterDOM;


export function BookInfo({ book, checkDate }) {

    return (
        <div className="container">
            <h1 className="book-title fly">{book.title}</h1>
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
                    {book.listPrice.isOnSale && <h2 className="red fly">ON SALE!</h2>}
                    <LongTxt txt={book.description} length={20} />
                </div>
                {/* <img src={`https://picsum.photos/id/${book.imgNum + 33}/200/300`} alt={book.title} className="book-img" /> */}

                <img
                    src={`../assets/BooksImages/${book.imgNum}.jpg`}
                    alt="Book cover"

                />

                <div className="btn-flex">
                    <Link to={`/book/bookdetails/${book.prevbookId}`}>Previous Book</Link>

                    <Link to={`/book/bookdetails/${book.nextbookId}`}>Next Book</Link>
                </div>
            </div>
        </div>
    )

}