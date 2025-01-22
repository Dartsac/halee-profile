import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/projects') {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {}
  }, [location.pathname])

  const shouldForceOneScreen =
    location.pathname === '/about' ||
    location.pathname === '/contact' ||
    location.pathname === '/'

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
