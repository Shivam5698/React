import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    let resetFrame
    const restoreFrame = window.requestAnimationFrame(() => {
      resetFrame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
    })

    return () => {
      window.cancelAnimationFrame(restoreFrame)
      if (resetFrame) window.cancelAnimationFrame(resetFrame)
    }
  }, [pathname])

  return null
}

export default ScrollToTop
