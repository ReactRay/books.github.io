import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
const GOOGLE_BOOK_KEY = 'googleBookDB'
const gGoogleBooks = utilService.loadFromStorage(GOOGLE_BOOK_KEY) || []
export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getFilterFromSrcParams,
  post,
  post2,
  getBooksFromGoogle,
  checkIfExists,
}

const dummyBooks = [
  {
    id: '7n_uEAAAQBAJ',
    title: 'Harry Potter and History',
    subtitle:
      ' books from google dont have that so here is some random test by silly Radwan :D',
    authors: ['Nancy R. Reagin'],
    description:
      'A guide to the history behind the world of Harry Potter--just in time for the last Harry Potter movie, Harry Potter and the Deathly Hallows (Part II) Harry Potter lives in a world that is both magical and historical. Hogwarts pupils ride an old-fashioned steam train to school, notes are taken on parchment with quill pens, and Muggle legends come to life in the form of werewolves, witches, and magical spells. This book is the first to explore the real history in which Harry\'s world is rooted. Did you know that bezoars and mandrakes were fashionable luxury items for centuries? Find out how Europeans first developed the potions, spells, and charms taught at Hogwarts, from Avada Kedavra to love charms. Learn how the European prosecution of witches led to the Statute of Secrecy, meet the real Nicholas Flamel, see how the Malfoys stack up against Muggle English aristocrats, and compare the history of the wizarding world to real-life history. Gives you the historical backdrop to Harry Potter\'s world Covers topics ranging from how real British boarding schools compare to Hogwarts to how parchment, quills, and scrolls used in the wizarding world were made Includes a timeline comparing the history of the wizarding world to Muggle "real" history Filled with fascinating facts and background, Harry Potter and History is an essential companion for every Harry Potter fan.',
    categories: ['Literary Criticism'],
    imgNum: 1,
    language: 'en',
    listPrice: {
      amount: '9.41',
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 311,
    publishedDate: '2022-05-14',
    image:
      'http://books.google.com/books/content?id=7n_uEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  {
    id: 'jNZSDwAAQBAJ',
    title: 'Jack Lord',
    subtitle: 'An Acting Life',
    authors: ['Sylvia D. Lynch'],
    description:
      "Before his rise to superstardom portraying Detective Steve McGarrett on the long-running police drama Hawaii Five-O, Jack Lord was already a dedicated and versatile actor on Broadway, in film and on television. His range of roles included a Virginia gentleman planter in Colonial Williamsburg (The Story of a Patriot), CIA agent Felix Leiter in the first James Bond movie (Dr. No) and the title character in the cult classic rodeo TV series Stoney Burke. Lord's career culminated in twelve seasons on Hawaii Five-O, where his creative control of the series left an indelible mark on every aspect of its production. This book, the first to draw on Lord's massive personal archive, gives a behind-the-scenes look into the life and work of a TV legend.",
    categories: ['Performing Arts'],
    imgNum: 9,
    language: 'en',
    listPrice: {
      amount: '25.24',
      currencyCode: '$',
      isOnSale: false,
    },
    pageCount: 230,
    publishedDate: '2021-06-10',
    image:
      'http://books.google.com/books/content?id=jNZSDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  {
    id: 'cVcjEQAAQBAJ',
    title: 'The Witcher and Philosophy',
    subtitle: 'Toss a Coin to Your Philosopher',
    authors: ['Matthew Brake', 'Kevin S. Decker'],
    description:
      "Embark on a revealing philosophical journey through the universe of The Witcher “If I'm to choose between one evil and another, I'd rather not choose at all,” growls the mutant “witcher,” Geralt of Rivia. Andrzej Sapkowski's Witcher books lay bare the adventures of monster hunters like Geralt, who seek to avoid humanity's conflicts and live only for the next kill and the coin that comes with it. But Geralt's destiny is complicated by his relationship with a powerful sorceress, Yennefer of Vengerberg. When he connects with a displaced princess, Ciri, Geralt lands right in the middle of the political conflicts of the Continent, which is endangered by Nilfgaard, a domineering southern kingdom that threatens to conquer the world. Part of the Blackwell Philosophy and Pop Culture series, The Witcher and Philosophy brings on twenty-seven philosophers to test their mettle against werewolves, the bruxa, strigas, vodyanoi, and kikimora; their work addresses the phenomenally popular books, three standalone Witcher video games, and the hit Netflix streaming show. These authors pass on their fascination with all manner of horror and sorcery: the mutations that make Geralt and others witchers, the commonalities between the Continent and post-apocalyptic settings, the intricacies of political power and scandal in the world of The Witcher, and reflections of our own world's changing views on race and gender that might offer hope—or portend a grim future. Engaging and accessible, The Witcher and Philosophy considers key themes and questions such as: Who is human, and who is a monster? Can Geralt afford to stay neutral? What kind of politics do sorceresses engage in? How many universes converge on the Continent? If we stare long enough into the abyss, does it stare back into us? Silver or steel? “Destiny is just the embodiment of the soul's desire to grow,” says Jaskier the bard, proving himself to be a natural philosopher. The tales of The Witcher remind us that our lives are a play written by both choice and destiny. And it is your destiny to read and be inspired by The Witcher and Philosophy.",
    categories: ['Philosophy'],
    imgNum: 5,
    language: 'en',
    listPrice: {
      amount: '15.12',
      currencyCode: '$',
      isOnSale: true,
    },
    pageCount: 279,
    publishedDate: '2020-08-21',
    image:
      'http://books.google.com/books/content?id=cVcjEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
]

_createBooks()

async function query(filterBy = {}) {
  try {
    let books = await storageService.query(BOOK_KEY)

    // if (!books || !books.length) {
    //   books = dummyBooks
    //   for (const book of dummyBooks) {
    //     await storageService.post(BOOK_KEY, book)
    //   }
    // }

    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }

    if (filterBy.subtitle) {
      const regExp = new RegExp(filterBy.subtitle, 'i')
      books = books.filter((book) => regExp.test(book.subtitle))
    }

    if (filterBy.authors) {
      const regExp = new RegExp(filterBy.authors, 'i')
      books = books.filter((book) =>
        book.authors.some((author) => regExp.test(author))
      )
    }

    if (filterBy.description) {
      const regExp = new RegExp(filterBy.description, 'i')
      books = books.filter((book) => regExp.test(book.description))
    }

    if (filterBy.categories) {
      const regExp = new RegExp(filterBy.categories, 'i')
      books = books.filter((book) =>
        book.categories.some((category) => regExp.test(category))
      )
    }

    if (filterBy.pageCount && !isNaN(filterBy.pageCount)) {
      books = books.filter((book) => book.pageCount >= +filterBy.pageCount)
    }

    if (filterBy.minPrice && !isNaN(filterBy.minPrice)) {
      books = books.filter(
        (book) => book.listPrice.amount >= +filterBy.minPrice
      )
    }

    if (filterBy.maxPrice && !isNaN(filterBy.maxPrice)) {
      books = books.filter(
        (book) => book.listPrice.amount <= +filterBy.maxPrice
      )
    }

    if (filterBy.isOnSale !== undefined) {
      if (filterBy.isOnSale === true)
        books = books.filter(
          (book) => book.listPrice.isOnSale === filterBy.isOnSale
        )
    }

    return books
  } catch (error) {}
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

function post(book) {
  if (book) return storageService.post(BOOK_KEY, book)
}
function post2(book) {
  if (book) return storageService.post2(BOOK_KEY, book)
}

function getEmptyBook() {
  return {
    id: '',
    title: '',
    subtitle: '',
    authors: '',
    publishedDate: '',
    description: '',
    pageCount: '',
    categories: '',
    imgNum: Math.floor(Math.random() * 20) + 1,
    language: '',
    listPrice: { amount: 0, currencyCode: '', isOnSale: false },
  }
}

function getDefaultFilter(
  filterBy = { title: '', description: '', minPrice: 0 }
) {
  return {
    title: filterBy.title || '',
    description: filterBy.description || '',
    minPrice: filterBy.minPrice || null,
  }
}

function _setNextPrevbookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
    const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevbook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextbookId = nextbook.id
    book.prevbookId = prevbook.id
    return book
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevbookId)
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = dummyBooks
  }

  utilService.saveToStorage(BOOK_KEY, books)
}

function getFilterFromSrcParams(srcParams) {
  const title = srcParams.get('title') || ''
  const subtitle = srcParams.get('subtitle') || ''
  const authors = srcParams.get('authors') || ''
  const description = srcParams.get('description') || ''
  const categories = srcParams.get('categories') || ''
  const minPageCount = srcParams.get('minPageCount') || ''
  const maxPageCount = srcParams.get('maxPageCount') || ''
  const minPrice = srcParams.get('minPrice') || ''
  const maxPrice = srcParams.get('maxPrice') || ''
  const isOnSale = srcParams.get('isOnSale') === 'true'

  return {
    title,
    subtitle,
    authors,
    description,
    categories,
    minPageCount: minPageCount ? +minPageCount : undefined,
    maxPageCount: maxPageCount ? +maxPageCount : undefined,
    minPrice: minPrice ? +minPrice : undefined,
    maxPrice: maxPrice ? +maxPrice : undefined,
    isOnSale: srcParams.has('isOnSale') ? isOnSale : undefined,
  }
}

/* async function handleChange(input) {
        if (!input) return;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${input.replace(' ', '+')}&key=AIzaSyABKAw_tIhDuZxOe9kthccDWlEjy2oa8F0`
        );
        const data = await response.json();
        setBooks(data.items || []);
        console.log(data.items);
    }
*/

async function getBooksFromGoogle(bookTitle) {
  if (!bookTitle) return Promise.resolve()

  /// cache
  const googlBook = gGoogleBooks[bookTitle]
  if (googlBook) {
    console.log('books from storage')
    return Promise.resolve(googlBook)
  }

  // fetch
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle.replace(
    ' ',
    '+'
  )}&key=AIzaSyABKAw_tIhDuZxOe9kthccDWlEjy2oa8F0`
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log('books from network')

    const books = _formatGoogleBooks(data.items)
    gGoogleBooks[bookTitle] = books
    utilService.saveToStorage(GOOGLE_BOOK_KEY, gGoogleBooks)
    console.log(books)
    return books
  } catch (error) {
    console.log(error)
  }
}

function _formatGoogleBooks(googleBooks) {
  return googleBooks.map((book) => {
    const googleBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['no author'],
      image: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description || 'no desc',
      categories: book.volumeInfo.categories || ['no category'],
      imgNum: Math.floor(Math.random() * 20) + 1,
      language: book.volumeInfo.language || 'en',
      pageCount: book.volumeInfo.pageCount,
      subtitle:
        book.volumeInfo.subtitle ||
        ' books from google dont have that so here is some random test by silly Radwan :D',
      listPrice: {
        amount: (Math.random() * (30 - 5) + 5).toFixed(2), // random price
        currencyCode: Math.random() < 0.5 ? 'EUR' : '$', // TODO add more currency
        isOnSale: Math.random() < 0.5, // is fine
      },
    }
    return googleBook
  })
}

async function checkIfExists(book, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (book.id === arr[i].id) return false
  }
  return true
}
