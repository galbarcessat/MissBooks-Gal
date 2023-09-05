const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { AddReview } from './pages/AddReview.jsx'
import { AddBook } from './pages/AddBook.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />

        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />}>
              <Route path='team' element={<AboutTeam />} />
              <Route path='goal' element={<AboutGoal />} />
            </Route>
            <Route path='/book' element={<BookIndex />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
            <Route path='/book/review/:bookId' element={<AddReview />} />
            <Route path='/book/edit/:bookId' element={<BookEdit />} />
            <Route path='/book/edit' element={<BookEdit />} />
            <Route path='/book/add' element={<AddBook />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
