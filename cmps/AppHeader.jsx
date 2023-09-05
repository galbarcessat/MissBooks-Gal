const { NavLink } = ReactRouterDOM
import { UserMsg } from "./user-msg.jsx"


export function AppHeader() {
  return (
    <header className='app-header'>
      <h1>Miss Books App</h1>
      <nav className='app-nav'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/book'>Books</NavLink>
      </nav>
      <UserMsg/>
    </header>
  )
}
