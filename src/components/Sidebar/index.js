import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoH from '../../assets/images/logo-h.png'
import LogoSubtitle from '../../assets/images/logo_sub_halee.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => (
  <div className='nav-bar'>
    <Link className='logo' to='/'>
      <img src={LogoH} alt='logo' />
      <img className='sub-logo' src={LogoSubtitle} alt='halee' />
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
