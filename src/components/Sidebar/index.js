import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoH from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faEnvelope,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => (
  <div className='nav-bar'>
    <Link className='logo' to='/'>
      <img src={LogoH} alt='logo' />
    </Link>
    <nav>
      <NavLink exact='true' activeclassname='active' to='/'>
        <FontAwesomeIcon icon={faHome} color='#4d4d4e' />
      </NavLink>

      <NavLink
        exact='true'
        activeclassname='active'
        className='about-link'
        to='/about'
      >
        <FontAwesomeIcon icon={faUser} color='#4d4d4e' />
      </NavLink>

      <NavLink
        exact='true'
        activeclassname='active'
        className='projects-link'
        to='/projects'
      >
        <FontAwesomeIcon icon={faBriefcase} color='#4d4d4e' />
      </NavLink>

      <NavLink
        exact='true'
        activeclassname='active'
        className='contact-link'
        to='/contact'
      >
        <FontAwesomeIcon icon={faEnvelope} color='#4d4d4e' />
      </NavLink>
    </nav>
    <ul>
      <li>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.linkedin.com/in/halee-mccray-7040892a1/'
        >
          <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' />
        </a>
      </li>
    </ul>
  </div>
)

export default Sidebar
