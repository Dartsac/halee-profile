import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = () => {
  const location = useLocation()

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
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {}
  }, [location.pathname])

  // Only force one-screen height on home and contact pages
  const shouldForceOneScreen =
    location.pathname === '/contact' || location.pathname === '/'

  return (
    <div className='App'>
      <Sidebar />
      <div className={`page ${shouldForceOneScreen ? 'fixed-height' : ''}`}>
        <span className='tags top-tags'>&lt;body&gt;</span>

        <Outlet />

        <span className='tags bottom-tags'>
          &lt;/body&gt;
          <br />
          <span className='bottom-tag-html'>&lt;html&gt;</span>
        </span>
      </div>
    </div>
  )
}

export default Layout
