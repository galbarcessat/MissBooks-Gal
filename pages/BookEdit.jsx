import { BooksService } from '../services/books.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(BooksService.getEmptyBook())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) {
      loadBook()
    }
  }, [])

  function loadBook() {
    BooksService.get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('err:', err))
  }

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

    setBookToEdit((prevBookToEdit) => {
      if(field ==='price'){
        return {
          ...prevBookToEdit,
          listPrice: {...prevBookToEdit.listPrice, amount: value}
        }
      }
      return { ...prevBookToEdit, [field]: value }
    })
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    BooksService.save(bookToEdit)
      .then(() => {
        navigate('/book')
        showSuccessMsg(`Book Edited! ${params.bookId}`)

      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem Editing ' + params.bookId)
      })
  }
  

  const { title, listPrice } = bookToEdit

  return (
    <section className='book-edit'>
      <form onSubmit={onSaveBook}>
        <label htmlFor='title'>Title:</label>
        <input onChange={handleChange} value={title} type='text' name='title' id='title' />

        <label htmlFor='price'>Price :</label>
        <input onChange={handleChange} value={listPrice.amount} type='number' name='price' id='price' />

        <button>Save</button>
      </form>
    </section>
  )
}
