import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)

    try {
      localStorage.setItem('megablog-theme', isDark ? 'dark' : 'light')
    } catch {
      // Theme persistence is optional when storage is unavailable.
    }
  }, [isDark])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.add('no-transitions')
    setIsDark((current) => !current)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('no-transitions'))
    })
  }

  return (
    <button
      type="button"
      className="btn-ghost size-11 rounded-full p-0"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.3 15.3A8.5 8.5 0 0 1 8.7 3.7 8.5 8.5 0 1 0 20.3 15.3Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
