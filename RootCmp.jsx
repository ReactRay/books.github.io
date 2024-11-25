import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Add } from './pages/Add.jsx'
import { BookDetails } from './pages/BookDetails.jsx'

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
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/bookdetails/:bookid" element={<BookDetails />} />

            <Route path="/book/add" element={<Add />} />
            <Route path="/book/add/:bookid" element={<Add />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
