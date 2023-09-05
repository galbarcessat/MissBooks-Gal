const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
import { BooksService } from '../services/books.service.js'

export function AddReview() {
  const [review, SetReview] = useState({ fullname: '', rating: '', date: '' })
  const [ratingType, setRatingType] = useState('select')
  const params = useParams()
  const navigate = useNavigate()
  console.log(params.bookId)

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }
    SetReview((prevReview) => ({ ...prevReview, [field]: value }))
  }

  //add function to add review in the service instead of using save in AddReview cmps
  //add Id to each review
  function onAddReview(ev) {
    ev.preventDefault()
    console.log(review)
    BooksService.get(params.bookId)
      .then((book) => {
        console.log(book)
        if (!book.reviews) {
          book.reviews = []
          //   console.log('doesnt have REVIEWS')
        }
        book.reviews.push(review)
        BooksService.save(book)
          .then(() => navigate(`/book/${params.bookId}`))
          .catch((err) => console.log('err:', err))
      })
      .catch((err) => console.log('err:', err))
  }

  return (
    <section className='add-review-container'>
      <h1>Add Review ⭐</h1>
      <div className='rating type'>
        <h1>Choose ratring type : </h1>
        <input type='radio' value='select' />
        <span>Select</span>
        <input type='radio' value='stars' />
        <span>Stars</span>
        <input type='radio' value='textbox' />
        <span>TextBox</span>
      </div>
      <form onSubmit={onAddReview}>
        <label htmlFor='fullname'>FullName :</label>
        <input onChange={handleChange} type='text' name='fullname' id='fullname' />
        <label htmlFor='rating'>Rating :</label>
        <select onChange={handleChange} name='rating' id='rating'>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>

        <label htmlFor='date'>Date :</label>
        <input onChange={handleChange} type='date' name='date' id='date' />

        <button>Add Review</button>
      </form>
    </section>
  )
}
