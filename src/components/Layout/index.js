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
    // Check if the current path is a project details page
    const isProjectDetailPage =
      location.pathname.startsWith('/projects/') &&
      location.pathname !== '/projects'

    // Enable scrolling for projects, about, and project detail pages
    // Only restrict scrolling on home and contact pages
    if (
      location.pathname === '/projects' ||
      isProjectDetailPage ||
      location.pathname === '/about'
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

  // Only force one-screen height on home and contact pages
  const shouldForceOneScreen =
    location.pathname === '/contact' || location.pathname === '/'

  return (
    <div className={`App ${menuOpen ? 'menu-open' : ''}`}>
      <Sidebar onMenuStateChange={handleMenuStateChange} />
      <div className={`page ${shouldForceOneScreen ? 'fixed-height' : ''}`}>
        <span className='tags top-tags'>&lt;body&gt;</span>

        <Outlet />

        <span className='tags bottom-tags'>
          &lt;/body&gt;
          <br />
          <span className='bottom-tag-html'>&lt;/html&gt;</span>
        </span>
      </div>
    </div>
  )
}

export default Layout
