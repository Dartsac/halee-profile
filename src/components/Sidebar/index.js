import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
  faPenNib,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const MOBILE_MENU_ID = 'site-navigation'
const MOBILE_BREAKPOINT = 768
const ICON_COLOR = '#7a7a7b'
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

const Sidebar = ({ onMenuStateChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()
  const menuButtonRef = useRef(null)
  const navBarRef = useRef(null)

  const closeMenu = useCallback(({ returnFocus = false } = {}) => {
    setIsOpen(false)
    if (returnFocus && menuButtonRef.current) {
      menuButtonRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // The mobile menu only exists on small screens; close it when leaving them.
  useEffect(() => {
    if (!isMobile) setIsOpen(false)
  }, [isMobile])

  // Close the menu after any navigation, including browser back/forward.
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    if (onMenuStateChange) onMenuStateChange(isOpen)
  }, [isOpen, onMenuStateChange])

  useEffect(() => () => document.body.classList.remove('menu-open'), [])

  // While the mobile menu is open: move focus into it, close on Escape,
  // and keep Tab / Shift+Tab cycling between the menu button and menu links.
  useEffect(() => {
    if (!isOpen) return undefined

    const firstLink = navBarRef.current?.querySelector('nav a')
    if (firstLink) firstLink.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu({ returnFocus: true })
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [
        menuButtonRef.current,
        ...navBarRef.current.querySelectorAll(FOCUSABLE_SELECTOR),
      ].filter(Boolean)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (!focusable.includes(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeMenu])

  const toggleNav = () => {
    if (isOpen) {
      closeMenu({ returnFocus: true })
    } else {
      setIsOpen(true)
    }
  }

  const handleNavClick = () => {
    closeMenu()
    window.scrollTo(0, 0)
  }

  const isMenuHidden = isMobile && !isOpen

  return (
    <>
      {isMobile && (
        <button
          ref={menuButtonRef}
          type='button'
          className={`hamburger-btn ${isOpen ? 'menu-open' : ''}`}
          onClick={toggleNav}
          aria-label='Menu'
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faTimes} color='#d3dbc1' size='2xl' />
          ) : (
            <FontAwesomeIcon icon={faBars} color='#d3dbc1' size='xl' />
          )}
        </button>
      )}

      <div
        id={MOBILE_MENU_ID}
        ref={navBarRef}
        className={`nav-bar ${isOpen ? 'mobile-show' : ''}`}
        inert={isMenuHidden ? '' : undefined}
      >
        <Link className='logo' to='/' onClick={handleNavClick}>
          <img src={Halee} alt='Halee Dobson – home' width='60' height='16' />
        </Link>
        <nav aria-label='Main'>
          <NavLink className='home-link' to='/' end onClick={handleNavClick}>
            <FontAwesomeIcon className='icon' icon={faHome} color={ICON_COLOR} />
            <span className='menu-text'>Home</span>
          </NavLink>

          <NavLink className='about-link' to='/about' onClick={handleNavClick}>
            <FontAwesomeIcon className='icon' icon={faUser} color={ICON_COLOR} />
            <span className='menu-text'>About Me</span>
          </NavLink>

          <NavLink
            className='projects-link'
            to='/projects'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon
              className='icon'
              icon={faBriefcase}
              color={ICON_COLOR}
            />
            <span className='menu-text'>Projects</span>
          </NavLink>

          <NavLink className='blog-link' to='/blog' onClick={handleNavClick}>
            <FontAwesomeIcon
              className='icon'
              icon={faPenNib}
              color={ICON_COLOR}
            />
            <span className='menu-text'>Blog</span>
          </NavLink>

          <NavLink
            className='contact-link'
            to='/contact'
            onClick={handleNavClick}
          >
            <FontAwesomeIcon
              className='icon'
              icon={faEnvelope}
              color={ICON_COLOR}
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
              aria-label='LinkedIn profile (opens in a new tab)'
            >
              <FontAwesomeIcon icon={faLinkedin} color={ICON_COLOR} />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
