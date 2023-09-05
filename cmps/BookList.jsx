import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <section className='books-list'>
      {books.map((book) => (
          <BookPreview key={book.id} book={book} onRemoveBook={onRemoveBook} />
      ))}
    </section>
  )
}
