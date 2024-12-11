
const { useState, useEffect } = React;


export function ReviewsForm({ addToReviews, bookId }) {
    const [review, setReview] = useState({ user: '', review: '', type: 'text', bookId });



    function handleSubmit(e) {
        e.preventDefault();

        addToReviews(review);

        setReview({ user: '', review: '', bookId });
    }


    return (
        <div className="review-form" >
            <h2>please select which type of review you would like to submit</h2>
            <form className="select-form">
                <select className={'select'} value={review.type} onChange={(e) => setReview((prev) => ({ ...prev, type: e.target.value }))}>
                    <option value='text'>text</option>
                    <option value="star">stars</option>
                </select>
            </form>

            <DynamicCmp review={review} handleSubmit={handleSubmit} setReview={setReview} />

        </div>
    );
}

function DynamicCmp(props) {
    if (props.review.type === 'text')
        return <TextReview {...props} />
    if (props.review.type === 'star')
        return <StarReview {...props} />
}

function TextReview({ review, handleSubmit, setReview }) {
    return (
        <div style={{ fontSize: '20px' }}>
            <form className="star-flex" onSubmit={handleSubmit}>
                <div>
                    <label>your name:</label>
                    <input
                        type="text"
                        name="user"
                        value={review.user || ''}
                        onChange={(e) => setReview((prev) => ({ ...prev, user: e.target.value }))}

                    />

                </div>
                <div>
                    <label>your review:</label>
                    <input
                        type="text"
                        name="review"
                        value={review.review || ''}
                        onChange={(e) => setReview((prev) => ({ ...prev, review: e.target.value }))}

                    />

                </div>

                <button style={{ fontSize: '20px' }}>submit your review</button>
            </form>
        </div>
    )
}


//        <i class="fa fa-star"></i>
function StarReview({ review, handleSubmit, setReview }) {
    const [starNumber, setStarNumber] = useState(0);
    useEffect(() => {
        setReview((prev) => ({ ...prev, review: starNumber }))
    }, [starNumber])
    return (
        <div className="star-flex">
            <div className="user-name">

                <label>Your name:</label>
                <input type="text" value={review.user} onChange={(e) => setReview(prev => ({ ...prev, user: e.target.value }))} />
            </div>

            <div className="stars">
                {[1, 2, 3, 4, 5].map((star, idx) => {
                    return (
                        <i
                            key={idx + 1}
                            onClick={() => {
                                setStarNumber(idx + 1)
                            }}
                            className={`fa fa-star ${idx + 1 <= starNumber ? 'bright' : ''}`
                            }
                        ></i>
                    );
                })}
            </div>
            <button onClick={handleSubmit} style={{ fontSize: '20px' }}>submit review</button>
        </div >
    );
}
