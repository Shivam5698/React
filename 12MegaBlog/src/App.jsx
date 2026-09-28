import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import ScrollToTop from './components/ScrollToTop.jsx'
import Skeleton from './components/ui/Skeleton.jsx'
import { Outlet } from 'react-router-dom' // Ye import zaroori hai

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, []) // <-- Yahan empty array [] lagana bohot zaroori hai!

  return !loading ? (
    <div className="relative isolate flex min-h-screen w-full flex-col bg-transparent text-(--text)">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main" className="relative z-10 flex flex-grow flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex min-h-screen w-full flex-col justify-center gap-4 px-6" aria-busy="true" aria-label="Loading MegaBlog">
      <Skeleton className="mx-auto h-10 w-48" />
      <Skeleton className="mx-auto h-64 w-full max-w-5xl rounded-3xl" />
      <Skeleton className="mx-auto h-4 w-2/3 max-w-2xl" />
    </div>
  )
}

export default App