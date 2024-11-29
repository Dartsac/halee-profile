import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-h.png';
import './index.scss'

const Home = () => {

  return(
  <div className="container home-page">
      <div className="text-zone">
        <h1>Hi, <br /> I'm 
        <img src = {LogoTitle} alt = "writter"/>
        alee
        <br />
        writter
        </h1>
        <h2>Crafting Words That Convert</h2>
        <Link to="/contact" className='flat-button'>CONTACT ME</Link>
      </div>
    </div>
  )

}

export default Home
