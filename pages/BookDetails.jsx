const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { BooksService } from '../services/books.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { Reviews } from '../cmps/Reviews.jsx'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    BooksService.get(params.bookId)
      .then(setBook)
      .catch((err) => console.log('err:', err))
  }

  function onBack() {
    navigate('/book')
  }

  function getPriceColor(price) {
    let priceTextColor
    if (price > 150) {
      priceTextColor = 'red'
    } else if (price < 20) {
      priceTextColor = 'green'
    }
    return priceTextColor
  }

  function getPageCountDesc(pageCount) {
    let pageCountDesc
    if (pageCount > 500) pageCountDesc = ' - Serious Reading'
    else if (pageCount > 200) pageCountDesc = ' - Descent Reading'
    else if (pageCount < 100) pageCountDesc = ' - Light Reading'
    return pageCountDesc
  }

  function getBookConditionTxt(publishedDate) {
    let text
    const currentYear = new Date().getFullYear()
    if (currentYear - publishedDate > 10) text = ' - Vintage'
    else if (currentYear - publishedDate < 1) text = ' - New'
    return text
  }

  if (!book) return <div>Loading...</div>

  return (
    <article className='book-details'>
      <h2>Title: {book.title}</h2>
      <h3>Subtitle: {book.subtitle}</h3>
      <h3>Authors: {book.authors}</h3>
      <h3>Categories : {book.categories.join(',')}</h3>
      <h3>Language : {book.language}</h3>
      <h5>Id : {book.id}</h5>
      <img src={book.thumbnail} alt='' />
      <h5>
        Price :
        <span className={getPriceColor(book.listPrice.amount)}>
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </span>
      </h5>
      {book.listPrice.isOnSale && <h5 className='onsale-txt'>ON SALE</h5>}
      <h5>
        Pages : {book.pageCount}
        <span>{getPageCountDesc(book.pageCount)}</span>
      </h5>
      <h5>
        published Date : {book.publishedDate} <span>{getBookConditionTxt(book.publishedDate)}</span>
      </h5>
      <h5>
        Description :<LongTxt txt={book.description} />
      </h5>
      <div>
        <Link to={`/book/${book.prevBookId}`}>Previous Book</Link>|
        <Link to={`/book/${book.nextBookId}`}>Next Book</Link> 
      </div>
      <button onClick={onBack}>Back</button>
      <button>
        <Link to={`/book/review/${book.id}`}>Add Review</Link>
      </button>
      {book.reviews && <Reviews book={book} />}
    </article>
  )
}
