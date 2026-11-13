import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'

const MAIN_CONTENT_ID = 'main-content'

const Layout = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)
  const shouldFocusMain = useRef(false)

  const handleMenuStateChange = useCallback((isOpen) => {
    setMenuOpen(isOpen)
  }, [])

  useEffect(() => {
    const isProjectDetailPage =
      location.pathname.startsWith('/projects/') &&
      location.pathname !== '/projects'

    const isBlogPage =
      location.pathname === '/blog' ||
      location.pathname.startsWith('/blog/')

    // Keep content pages scrollable, including the homepage on small screens.
    // The contact page retains its fixed-height layout.
    if (
      location.pathname === '/' ||
      location.pathname === '/projects' ||
      isProjectDetailPage ||
      location.pathname === '/about' ||
      isBlogPage
    ) {
      document.body.classList.add('allow-scroll')
      document.body.style.overflow = 'auto'
    } else {
      document.body.classList.remove('allow-scroll')
      document.body.style.overflow = 'hidden'
    }

    window.scrollTo(0, 0)

    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      shouldFocusMain.current = true
    }
  }, [location.pathname])

  // After client-side navigation, move focus to the new page content so
  // keyboard and screen reader users start at the top of the page. Wait until
  // the mobile menu has closed, because <main> is inert while it is open.
  useEffect(() => {
    if (shouldFocusMain.current && !menuOpen && mainRef.current) {
      shouldFocusMain.current = false
      mainRef.current.focus({ preventScroll: true })
    }
  }, [location.pathname, menuOpen])

  const skipToContent = (event) => {
    // HashRouter would treat "#main-content" as a route, so focus directly.
    event.preventDefault()
    mainRef.current?.focus()
  }

  // Only force one-screen height on the contact page.
  const shouldForceOneScreen = location.pathname === '/contact'

  return (
    <div className={`App ${menuOpen ? 'menu-open' : ''}`}>
      <a className='skip-link' href={`#${MAIN_CONTENT_ID}`} onClick={skipToContent}>
        Skip to main content
      </a>
      <Sidebar onMenuStateChange={handleMenuStateChange} />
      <main
        id={MAIN_CONTENT_ID}
        ref={mainRef}
        tabIndex={-1}
        inert={menuOpen ? '' : undefined}
        className={`page ${shouldForceOneScreen ? 'fixed-height' : ''}`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
