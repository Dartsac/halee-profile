import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import Halee from '../../assets/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faEnvelope,
  faHome,
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Sidebar = ({ onMenuStateChange }) => {
  // Track if the mobile nav is open
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile and update state
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Toggle the nav
  const toggleNav = () => {
    const newState = !isOpen
    setIsOpen(newState)

    // Toggle body class to prevent scrolling
    if (newState) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    // Notify parent component if callback exists
    if (onMenuStateChange) {
      onMenuStateChange(newState)
    }
  }

  // Function to handle navigation and scroll to top
  const handleNavClick = () => {
    setIsOpen(false)
    document.body.classList.remove('menu-open')
    window.scrollTo(0, 0)

    // Notify parent component
    if (onMenuStateChange) {
      onMenuStateChange(false)
    }
  }

  return (
    <>
      {/* Hamburger button (only visible on small screens) */}
      {isMobile && (
        <button
          className={`hamburger-btn ${isOpen ? 'menu-open' : ''}`}
          onClick={toggleNav}
          aria-label='Menu'
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faTimes} color='#d3dbc1' size='2xl' />
          ) : (
            <FontAwesomeIcon icon={faBars} color='#d3dbc1' size='xl' />
          )}
        </button>
      )}

      {/* The sidebar */}
      <div className={`nav-bar ${isOpen ? 'mobile-show' : ''}`}>
        <Link className='logo' to='/' onClick={handleNavClick}>
          <img src={Halee} alt='logo' width='60' height='16' />
        </Link>
        <nav>
          <NavLink
            exact='true'
            activeclassname='active'
            className='home-link'
            to='/'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon className='icon' icon={faHome} color='#4d4d4e' />
            <span className='menu-text'>Home</span>
          </NavLink>

          <NavLink
            exact='true'
            activeclassname='active'
            className='about-link'
            to='/about'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon className='icon' icon={faUser} color='#4d4d4e' />
            <span className='menu-text'>About Me</span>
          </NavLink>

          <NavLink
            exact='true'
            activeclassname='active'
            className='projects-link'
            to='/projects'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon
              className='icon'
              icon={faBriefcase}
              color='#4d4d4e'
            />
            <span className='menu-text'>Projects</span>
          </NavLink>

          <NavLink
            exact='true'
            activeclassname='active'
            className='contact-link'
            to='/contact'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon
              className='icon'
              icon={faEnvelope}
              color='#4d4d4e'
            />
            <span className='menu-text'>Contact Me</span>
          </NavLink>
        </nav>
        <ul>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.linkedin.com/in/halee-mccray-7040892a1/'
              onClick={handleNavClick}
              aria-label='LinkedIn Profile'
            >
              <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
