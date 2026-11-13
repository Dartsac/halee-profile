import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle menu state changes from the Sidebar component
  const handleMenuStateChange = (isOpen) => {
    setMenuOpen(isOpen)
  }

  useEffect(() => {
    // Check if the current path is a project details page or blog page
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
      document.body.style.overflow = menuOpen ? 'hidden' : 'hidden'
    }

    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0)

    // Close mobile menu when route changes
    setMenuOpen(false)
    document.body.classList.remove('menu-open')
  }, [location.pathname, menuOpen])

  // Only force one-screen height on the contact page.
  const shouldForceOneScreen = location.pathname === '/contact'

  return (
    <div className={`App ${menuOpen ? 'menu-open' : ''}`}>
      <Sidebar onMenuStateChange={handleMenuStateChange} />
      <div className={`page ${shouldForceOneScreen ? 'fixed-height' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
