const { Outlet ,Link} = ReactRouterDOM

export function AboutUs() {
  return (
    <section>
      <h1>About Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque aliquid voluptates commodi molestias
        molestiae! Fuga repudiandae amet aut quas optio libero, eos deleniti dicta voluptas, placeat tempora
        fugit pariatur nulla!
      </p>
      <nav>
        <Link to='/about/team'>Team</Link>
        <Link to='/about/goal'>Goal</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </section>
  )
}
