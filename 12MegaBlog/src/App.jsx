import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
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
    /* Yahan text-center add kiya hai aur sir ka original layout rakha hai */
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 text-center mt-10">
      <div className='w-full block'>
        <Header />
        <main>
           <Outlet /> {/* Yahan TODO hatakar Outlet laga diya hai */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App