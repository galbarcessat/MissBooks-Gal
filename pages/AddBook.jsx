const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { BooksService } from '../services/books.service.js'
import { GoogleBooksList } from '../cmps/GoogleBooksList.jsx'

export function AddBook() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchTerm) {
      debouncedHandleSearch()
    }
  }, [searchTerm])

  const debouncedHandleSearch = debounce(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`).then((res) => {
      setBooks(res.data.items)
    })
  }, 500)

  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  function handleChange({ target }) {
    let value = target.value
    setSearchTerm(value)
  }

  function onAddBook(googleBookId) {
    let googleBook = books.find((book) => book.id === googleBookId)

    BooksService.query(BooksService.getDefaultFilter()).then((resBooks) => {
      if (resBooks.findIndex((book) => book.title === googleBook.title) !== -1) {
        console.log('BOOK EXISTS')
      } else {
        BooksService.addGoogleBook(googleBook).then((book) => {
          console.log('BOOK ADDED:', book)
          BooksService.save(book).then(navigate('/book'))
        })
      }
    })
  }


  return (
    <section className='add-book-container'>
      <label htmlFor='search'>Search Book :</label>
      <input onChange={handleChange} type='text' name='search' id='search' value={searchTerm} />
      {books && <GoogleBooksList books={books} onAddBook={onAddBook} />}
    </section>
  )
}
