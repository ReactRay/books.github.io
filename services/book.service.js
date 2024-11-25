import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'


export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
}



const dummyBooks = [
  {
    id: 'b1',
    bookName: 'The Great Gatsby',
    bookDesc: 'A novel about the American dream set in the Jazz Age.',
    bookPrice: 15.99,
  },
  {
    id: 'b2',
    bookName: 'To Kill a Mockingbird',
    bookDesc: 'A story about racial injustice and the loss of innocence in the South.',
    bookPrice: 10.99,
  },
];

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (!books || books.length === 0) return dummyBooks;

    if (filterBy.bookName) {
      const regExp = new RegExp(filterBy.bookName, 'i');
      books = books.filter((book) => regExp.test(book.bookName));
    }

    if (filterBy.bookDesc) {
      const regExp = new RegExp(filterBy.bookDesc, 'i');
      books = books.filter((book) => regExp.test(book.bookDesc));
    }

    if (filterBy.minPrice) {
      books = books.filter((book) => book.bookPrice >= +filterBy.minPrice);
    }

    if (filterBy.maxPrice) {
      books = books.filter((book) => book.bookPrice <= +filterBy.maxPrice);
    }

    return books.length ? books : dummyBooks;
  });
}


function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(bookName = '', bookDesc = '', bookPrice = '') {
  return { bookName, bookDesc, bookPrice }
}

function getDefaultFilter(
  filterBy = { bookName: '', bookDesc: '', minPrice: 0 }
) {
  return {
    bookName: filterBy.bookName,
    bookDesc: filterBy.bookDesc,
    minPrice: filterBy.minPrice,
  }
}


