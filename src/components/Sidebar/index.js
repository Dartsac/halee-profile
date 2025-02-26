import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoH from '../../assets/images/logo.png'
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

const Sidebar = () => {
  // Track if the mobile nav is open
  const [isOpen, setIsOpen] = useState(false)

  // Toggle the nav
  const toggleNav = () => setIsOpen(!isOpen)

  // Function to handle navigation and scroll to top
  const handleNavClick = () => {
    setIsOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {/* Hamburger button (only visible on small screens) */}
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

      {/* The sidebar */}
      <div className={`nav-bar ${isOpen ? 'mobile-show' : ''}`}>
        <Link className='logo' to='/' onClick={handleNavClick}>
          <img src={LogoH} alt='logo' />
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
              onClick={() => setIsOpen(false)}
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
