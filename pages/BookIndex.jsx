import { BooksService } from '../services/books.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(BooksService.getDefaultFilter())

  useEffect(() => {
    console.log('mount')
    BooksService.query(filterBy).then((books) => setBooks(books))
  }, [filterBy])

  function onRemoveBook(bookId) {
    BooksService.remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book Removed! ${bookId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem Removing ' + bookId)
      })
  }

  function onSetFilterBy(filterBy) {
    console.log('filterBy:', filterBy)
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className='book-index-container'>
      <h1 className='main-title'>Book Shop 📚</h1>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button>
        <Link to='/book/edit'>Edit New Book</Link>
      </button>
      <button>
        <Link to='/book/add'>Add Book</Link>
      </button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
