import { LongTxt } from "./LongTxt.jsx";


const { useState, useEffect } = React

export function Reviews({ reviews, removeReview }) {




    return (
        <div >

            <div className="review-form" >
                <h2>Reviews</h2>
                {reviews ? reviews.map((review, idx) => {
                    return (
                        <div key={review.id + idx} className="review" >
                            <button className="red" onClick={() => removeReview(review.id)} >X</button>
                            <h2>{review.user}</h2>

                            <LongTxt txt={review.review} length={20} />
                        </div>
                    )
                }) : ''}
            </div>

        </div>
    )

}