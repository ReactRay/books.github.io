import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const REVIEWS_KEY= 'reviewsDB'

export const reviewService = {
    query,
    post
}


async function query(bookid) {
  const reviews = await storageService.query(REVIEWS_KEY); 
  if (!reviews || reviews.length === 0) { // Fix typo
    return [];
  }
  return reviews.filter((review) => String(review.bookId) === String(bookid)); 
}


function post(review){
   return  storageService.post(REVIEWS_KEY,review)
}

