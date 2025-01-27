import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import './index.scss'

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className='container projects-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']}
              idx={15}
            />
          </h1>
          <p>
            Below are some of my favorite (and most challenging) projects. Click
            on any card to learn more!
          </p>
        </div>

        {/* Projects Grid */}
        <div className='projects-grid'>
          {/* Project 1 */}
          <Link className='project-item' to='/projects/email'>
            <div className='project-img-wrapper'>
              <div className='project-img-1'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>Email Campaigns</h3>
                {/* A small arrow svg, same as your sample */}
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 6.5L6 18.5' stroke='#1A1A19'></path>
                  <path d='M8 6.5H18V16.5' stroke='#1A1A19'></path>
                </svg>
              </div>
            </div>
            <span className='count'>001</span>
          </Link>

          {/* Project 2 */}
          <Link className='project-item' to='/projects/sms'>
            <div className='project-img-wrapper'>
              <div className='project-img-2'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>SMS Strategies</h3>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 6.5L6 18.5' stroke='#1A1A19'></path>
                  <path d='M8 6.5H18V16.5' stroke='#1A1A19'></path>
                </svg>
              </div>
            </div>
            <span className='count'>002</span>
          </Link>

          {/* Project 3 */}
          <Link className='project-item' to='/projects/blog'>
            <div className='project-img-wrapper'>
              <div className='project-img-3'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>Blog Articles</h3>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 6.5L6 18.5' stroke='#1A1A19'></path>
                  <path d='M8 6.5H18V16.5' stroke='#1A1A19'></path>
                </svg>
              </div>
            </div>
            <span className='count'>003</span>
          </Link>

          {/* Project 4 */}
          <Link className='project-item' to='/projects/ecom/'>
            <div className='project-img-wrapper'>
              <div className='project-img-4'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>E-Commerce Product Copy</h3>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 6.5L6 18.5' stroke='#1A1A19'></path>
                  <path d='M8 6.5H18V16.5' stroke='#1A1A19'></path>
                </svg>
              </div>
            </div>
            <span className='count'>004</span>
          </Link>
        </div>
      </div>

      <Loader />
    </>
  )
}

export default Projects
