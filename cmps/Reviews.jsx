import { LongTxt } from "./LongTxt.jsx";

const { useState, useEffect } = React

export function Reviews({ reviews, removeReview }) {




    return (
        <div >

            <div className="review-form" >
                <h2>Reviews</h2>
                {reviews ? reviews.map((review, idx) => {
                    if (review.type === 'text') {
                        return (
                            <div key={review.id + idx} className="review" >
                                <button className="red" onClick={() => removeReview(review.id)} >X</button>
                                <h2>{review.user}</h2>

                                <LongTxt txt={review.review} length={20} />
                            </div>
                        )
                    }
                    if (review.type === 'star') {
                        return (
                            <div key={review.id + idx} className="review" >
                                <button className="red" onClick={() => removeReview(review.id)} >X</button>
                                <h2>{review.user}</h2>
                                {[1, 2, 3, 4, 5].map((star, idx) => {
                                    return (
                                        <i class={`fa fa-star ${idx + 1 <= review.review ? 'bright' : ''}`}></i>
                                    )
                                })}

                            </div>
                        )
                    }

                }) : ''}
            </div>

        </div>
    )
}