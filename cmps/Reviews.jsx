
export function Reviews({ reviews, removeReview }) {


    return (
        <div >

            <div className="review-form" >
                <h2>Reviews</h2>
                {reviews ? reviews.map((review) => {
                    return (
                        <div key={review.id} className="review" >
                            <button className="red" onClick={() => removeReview(review.id)} >X</button>
                            <h2>{review.user}</h2>
                            <p>{review.review}</p>

                        </div>
                    )
                }) : ''}
            </div>

        </div>
    )

}