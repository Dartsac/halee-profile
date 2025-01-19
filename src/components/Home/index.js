import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoTitle from '../../assets/images/logo-h.png'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const descriptors = ['skilled writer.', 'avid reader.', 'sharp editor.']

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = ['a', 'l', 'e', 'e']
  const jobArray = ['w', 'r', 'i', 't', 't', 'e', 'r', '.']

  useEffect(() => { 
    const timer = setTimeout(() => { 
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => clearTimeout(timer)
  }, [])


  return (
    <div className='container home-page'>
      <div className='text-zone'>
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m</span>
          <img src={LogoTitle} alt='writter' />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
          <br />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={19}
          />
        </h1>
        <h2>Crafting Words That Inspire</h2>
        <Link to='/contact' className='flat-button'>
          CONTACT ME
        </Link>
      </div>
    </div>
  )
}

export default Home
