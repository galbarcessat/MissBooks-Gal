import { BooksService } from '../services/books.service.js'
const { useState, useEffect } = React

export function Reviews({ book }) {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    setReviews(book.reviews)
  }, [])

  function getStars(rating) {
    const star = '⭐'
    return star.repeat(rating)
  }
// change by fullname to by Id
  function onDeleteReview(book, reviewFullName) {
    BooksService.deleteReview(book, reviewFullName)
      .then(setReviews((prevReviews) => prevReviews.filter((review) => review.fullname !== reviewFullName)))
      .catch((err) => console.log('err:', err))
  }
  
  if (!reviews) return <div>Loading...</div>
  console.log(reviews)

  return (
    <section className='reviews-container'>
      {reviews.map((review) => (
        <div className='review-card' key={review.fullname}>
          <span>FullName : {review.fullname}</span> <span>Rate : {getStars(review.rating)}</span>{' '}
          <span>{review.date}</span>
          <button onClick={() => onDeleteReview(book, review.fullname)}>Delete Review</button>
        </div>
      ))}
    </section>
  )
}
