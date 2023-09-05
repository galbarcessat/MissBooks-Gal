const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt, maxPrice } = filterByToEdit
  return (
    <section className='car-filter'>
      <h2>Filter Our Books</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor='txt'>Name : </label>
        <input value={txt} onChange={handleChange} type='text' placeholder='By Name' id='txt' name='txt' />

        <label htmlFor='maxPrice'>Max Price : </label>
        <input
          value={maxPrice}
          onChange={handleChange}
          type='number'
          placeholder='By Max Price'
          id='maxPrice'
          name='maxPrice'
        />

        <button>Set Filter</button>
      </form>
    </section>
  )
}
