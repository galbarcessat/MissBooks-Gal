const { Link } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
  return (
    <article className='book-preview'>
      <h2>Title: {book.title}</h2>
      <h3>Authors: {book.authors}</h3>
      <h5>Id: {book.id}</h5>
      <img src={book.thumbnail} alt='' />
      <h5>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </h5>
      <section className='books-preview-btns'>
        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
        <button>
          <Link to={`/book/${book.id}`}>Details</Link>
        </button>
        <button>
          <Link to={`/book/edit/${book.id}`}>Edit</Link>
        </button>
      </section>
    </article>
  )
}
