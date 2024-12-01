
const { useState, useEffect } = React;


export function ReviewsForm({ addToReviews, bookId }) {
    const [review, setReview] = useState({ user: '', review: '', bookId });

    function handleSubmit(e) {
        e.preventDefault();

        addToReviews(review);

        setReview({ user: '', review: '', bookId });
    }

    return (
        <div >

            <form onSubmit={handleSubmit} className="review-form">
                <h2>Leave a review</h2>
                <div>
                    <label>Your Name:</label>
                    <input
                        type="text"
                        value={review.user || ''}
                        onChange={(e) =>
                            setReview((prev) => ({ ...prev, user: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label>Your Review:</label>
                    <input
                        type="text"
                        value={review.review || ''}
                        onChange={(e) =>
                            setReview((prev) => ({ ...prev, review: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <button type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    );
}