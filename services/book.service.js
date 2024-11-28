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
    title: 'The Great Gatsby',
    subtitle: 'A Jazz Age classic',
    authors: ['F. Scott Fitzgerald'],
    description: 'A novel about the American dream set in the Jazz Age.',
    categories: ['Classic'],
    imgNum: 6,
    language: 'English',
    listPrice: {
      amount: 15.99,
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 180,
    publishedDate: '1925-04-10',
  },
  {
    id: 'b2',
    title: 'To Kill a Mockingbird',
    subtitle: 'A story of justice',
    authors: ['Harper Lee'],
    description: 'A story about racial injustice and the loss of innocence in the South.',
    categories: ['Fiction'],
    imgNum: 2,
    language: 'English',
    listPrice: {
      amount: 10.99,
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 281,
    publishedDate: '1960-07-11',
  },
  {
    id: 'b3',
    title: '1984',
    subtitle: 'A dystopian masterpiece',
    authors: ['George Orwell'],
    description: 'A story exploring totalitarianism, surveillance, and freedom.',
    categories: ['Dystopian', 'Classic'],
    imgNum: 3,
    language: 'English',
    listPrice: {
      amount: 12.49,
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 328,
    publishedDate: '1949-06-08',
  },
  {
    id: 'b4',
    title: 'Pride and Prejudice',
    subtitle: 'A tale of love and society',
    authors: ['Jane Austen'],
    description: 'A classic novel about love and social class in Regency England.',
    categories: ['Romance', 'Classic'],
    imgNum: 7,
    language: 'English',
    listPrice: {
      amount: 9.99,
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 279,
    publishedDate: '1813-01-28',
  },
  {
    id: 'b5',
    title: 'The Catcher in the Rye',
    subtitle: 'A journey through adolescence',
    authors: ['J.D. Salinger'],
    description: 'A story of teenage rebellion and identity.',
    categories: ['Fiction'],
    imgNum: 4,
    language: 'English',
    listPrice: {
      amount: 14.99,
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 214,
    publishedDate: '1951-07-16',
  },
  {
    id: 'b6',
    title: 'The Hobbit',
    subtitle: 'A fantasy adventure',
    authors: ['J.R.R. Tolkien'],
    description: 'A journey of a hobbit seeking treasure and adventure.',
    categories: ['Fantasy'],
    imgNum: 9,
    language: 'English',
    listPrice: {
      amount: 16.99,
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 310,
    publishedDate: '1937-09-21',
  },
  {
    id: 'b7',
    title: 'Moby Dick',
    subtitle: 'The quest for the white whale',
    authors: ['Herman Melville'],
    description: 'A tale of obsession and revenge on the open sea.',
    categories: ['Adventure', 'Classic'],
    imgNum: 1,
    language: 'English',
    listPrice: {
      amount: 13.50,
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 635,
    publishedDate: '1851-10-18',
  },
  {
    id: 'b8',
    title: 'Brave New World',
    subtitle: 'A futuristic vision',
    authors: ['Aldous Huxley'],
    description: 'A chilling vision of a dystopian future.',
    categories: ['Dystopian'],
    imgNum: 8,
    language: 'English',
    listPrice: {
      amount: 11.99,
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 268,
    publishedDate: '1932-08-31',
  },
  {
    id: 'b9',
    title: 'Crime and Punishment',
    subtitle: 'A psychological drama',
    authors: ['Fyodor Dostoevsky'],
    description: 'An exploration of morality and redemption.',
    categories: ['Philosophy', 'Classic'],
    imgNum: 5,
    language: 'Russian',
    listPrice: {
      amount: 19.99,
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 671,
    publishedDate: '1866-01-01',
  },
  {
    id: 'b10',
    title: 'The Alchemist',
    subtitle: 'A journey of self-discovery',
    authors: ['Paulo Coelho'],
    description: 'An inspiring tale about following your dreams.',
    categories: ['Philosophy', 'Fiction'],
    imgNum: 10,
    language: 'Portuguese',
    listPrice: {
      amount: 13.99,
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 208,
    publishedDate: '1988-04-01',
  },
];


async function query(filterBy = {}) {
  let books = await storageService.query(BOOK_KEY);
  if (!books || !books.length) {
    books = dummyBooks;
    for (const book of dummyBooks) {
      await storageService.post(BOOK_KEY, book);
    }
  }

  if (filterBy.title) {
    const regExp = new RegExp(filterBy.title, "i");
    books = books.filter((book) => regExp.test(book.title));
  }

  if (filterBy.subtitle) {
    const regExp = new RegExp(filterBy.subtitle, "i");
    books = books.filter((book) => regExp.test(book.subtitle));
  }

  if (filterBy.authors) {
    const regExp = new RegExp(filterBy.authors, "i");
    books = books.filter((book) =>
      book.authors.some((author) => regExp.test(author))
    );
  }

  if (filterBy.description) {
    const regExp = new RegExp(filterBy.description, "i");
    books = books.filter((book) => regExp.test(book.description));
  }

  if (filterBy.categories) {
    const regExp = new RegExp(filterBy.categories, "i");
    books = books.filter((book) =>
      book.categories.some((category) => regExp.test(category))
    );
  }

  if (filterBy.pageCount && !isNaN(filterBy.pageCount)) {
    books = books.filter((book) => book.pageCount === +filterBy.pageCount);
  }

  if (filterBy.minPrice && !isNaN(filterBy.minPrice)) {
    books = books.filter((book) => book.listPrice.amount >= +filterBy.minPrice);
  }

  if (filterBy.maxPrice && !isNaN(filterBy.maxPrice)) {
    books = books.filter((book) => book.listPrice.amount <= +filterBy.maxPrice);
  }

  if (filterBy.isOnSale !== undefined) {
    books = books.filter((book) => book.listPrice.isOnSale === filterBy.isOnSale);
  }

  return books;
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

function getEmptyBook(
  title = '',
  subtitle = '',
  authors = [],
  description = '',
  categories = [],
  imgNum = 0,
  language = 'Unknown',
  amount = 0,
  currencyCode = 'USD',
  isOnSale = false,
  pageCount = 0,
  publishedDate = 'Unknown'
) {
  return {
    title,
    subtitle,
    authors,
    description,
    categories,
    imgNum,
    language,
    listPrice: { amount, currencyCode, isOnSale },
    pageCount,
    publishedDate,
  }
}

function getDefaultFilter(
  filterBy = { title: '', description: '', minPrice: 0 }
) {
  return {
    title: filterBy.title || '',
    description: filterBy.description || '',
    minPrice: filterBy.minPrice || null,  // Use null to indicate no filter by price
  }
}
