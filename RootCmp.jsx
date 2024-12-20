import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { Team } from './pages/Team.jsx'
import { Footer } from './cmps/Footer.jsx'
import { Notification } from './cmps/Notification.jsx'
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} >
              <Route path='/about/team' element={<Team />} />
            </Route>

            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/bookdetails/:bookid" element={<BookDetails />} />

            <Route path="/book/Bookedit" element={<BookEdit />} />
            <Route path="/book/Bookedit/:bookid" element={<BookEdit />} />
          </Routes>
          <Notification />

        </main>
      </section>

    </Router>
  )
}
