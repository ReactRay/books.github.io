



export function Reviews({ reviews }) {


    return (
        <div >

            <div className="review-form" >
                <h2>Reviews</h2>
                {reviews ? reviews.map((review) => {
                    return (
                        <div key={review.id} className="review" >
                            <h2>{review.user}</h2>
                            <p>{review.review}</p>
                        </div>
                    )
                }) : ''}
            </div>

        </div>
    )

}