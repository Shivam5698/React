import { useEffect, useRef, useState } from 'react'
import { Container, Logo, LogoutBtn, ThemeToggle } from '../index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const menuToggleRef = useRef(null)
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts", // '/' add kiya gaya hai
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const navigateTo = (slug) => {
    navigate(slug)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const menu = mobileMenuRef.current
    const focusableElements = menu?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
    if (!focusableElements?.length) return undefined

    focusableElements[0].focus()
    const trapFocus = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        menuToggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [mobileMenuOpen])

  const renderNavItems = () => navItems.map((item) => {
    if (!item.active) return null

    const isCurrentPage = location.pathname === item.slug
    const itemClassName = item.slug === '/signup'
      ? 'btn-primary min-h-10 px-4 py-2'
      : `btn-ghost min-h-10 rounded-full px-4 py-2 ${isCurrentPage ? 'bg-indigo-500/10 text-(--primary)' : 'text-(--text-muted) hover:bg-indigo-500/5 hover:text-(--text)'}`

    return (
      <li key={item.name}>
        <button
          aria-current={isCurrentPage ? 'page' : undefined}
          onClick={() => navigateTo(item.slug)}
          className={itemClassName}
        >
          {item.name}
        </button>
      </li>
    )
  })

  return (
    <header className="site-header sticky top-0 z-50 px-3 sm:px-5">
      <div className="header-glass glass-panel relative mx-auto h-full max-w-6xl rounded-full px-3 shadow-md shadow-slate-950/5 sm:px-5">
        <Container>
          <nav aria-label="Main" className="flex h-full items-center gap-3">
            <Link to="/" aria-label="MegaBlog home" className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
              <Logo width="auto" />
            </Link>
            <ul className="ml-auto hidden items-center gap-1 md:flex">
              {renderNavItems()}
            </ul>
            <div className="ml-auto flex items-center gap-1 md:ml-3">
              <ThemeToggle />
              {authStatus && <div className="hidden md:block"><LogoutBtn /></div>}
              <button
                type="button"
                className="btn-ghost size-11 rounded-full p-0 md:hidden"
                ref={menuToggleRef}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m18 6-12 12M6 6l12 12" /></svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                )}
              </button>
            </div>
          </nav>
          {mobileMenuOpen && (
            <div id="mobile-navigation" ref={mobileMenuRef} className="absolute left-3 right-3 top-[calc(100%+0.5rem)] rounded-2xl border border-(--border) bg-(--surface-solid) p-3 shadow-xl md:hidden">
              <ul className="grid gap-1" aria-label="Main navigation">
                {renderNavItems()}
                {authStatus && <li className="pt-1"><LogoutBtn /></li>}
              </ul>
            </div>
          )}
        </Container>
      </div>
    </header>
  )
}

export default Header