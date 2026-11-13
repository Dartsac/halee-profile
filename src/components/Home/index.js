import { Link } from 'react-router-dom'
import Logo from '../Logo'
import './index.scss'
import Loader from '../Loader'

const Home = () => (
  <>
    <div className='container home-page'>
      <div className='text-zone'>
        <h1>Halee Dobson</h1>
        <h2>Copywriter &amp; content strategist</h2>
        <p className='hero-copy'>
          I write emails, SMS campaigns, blog articles, and product pages for
          brands. My copy matches each brand's voice and tells readers what to
          do next.
        </p>
        <div className='hero-actions'>
          <Link to='/projects' className='flat-button'>
            View My Work
          </Link>
          <Link to='/contact' className='flat-button secondary-button'>
            Contact Me
          </Link>
        </div>
        <Link to='/projects/email' className='featured-work'>
          Featured work: Bevel seasonal email campaigns →
        </Link>
      </div>
      <Logo />
    </div>
    <Loader />
  </>
)

export default Home
