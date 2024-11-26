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
    imgNum: 1,
    language: 'English',
    listPrice: {
      amount: 15.99,
      currencyCode: 'USD',
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
      currencyCode: 'USD',
      isOnSale: false,
    },
    pageCount: 281,
    publishedDate: '1960-07-11',
  },
]

async function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(async (books) => {
    if (!books || books.length === 0) {
      if (!localStorage.getItem(BOOK_KEY)) {
       await storageService.post(BOOK_KEY, dummyBooks[0])
       await storageService.post(BOOK_KEY,dummyBooks[1])
       
        return storageService.query(BOOK_KEY)
      }
      await storageService.post(BOOK_KEY, dummyBooks[0])
       await storageService.post(BOOK_KEY,dummyBooks[1])
       
        return storageService.query(BOOK_KEY)
    }
    // Filter books based on the filter criteria
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i');
      books = books.filter((book) => regExp.test(book.title));
    }

    if (filterBy.description) {
      const regExp = new RegExp(filterBy.description, 'i');
      books = books.filter((book) => regExp.test(book.description));
    }

    if (filterBy.minPrice && !isNaN(filterBy.minPrice)) {
      books = books.filter((book) => book.listPrice.amount >= +filterBy.minPrice);
    }

    if (filterBy.maxPrice && !isNaN(filterBy.maxPrice)) {
      books = books.filter((book) => book.listPrice.amount <= +filterBy.maxPrice);
    }

    // Return the filtered books or the dummyBooks if no matches
    return books.length ? books : [];
  }).catch((error) => {
    console.error('Error querying books:', error);
    return [];  // Fallback to dummyBooks if there's an error
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
