import { useEffect, useState } from 'react'
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
          <a className='project-item' href='#project1'>
            <div className='project-img-wrapper'>
              <div className='project-img-1'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>Crystal</h3>
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
              <p className='subtitle-sm'>
                Individual Guide to Spirituality Application
              </p>
            </div>
            <span className='count'>001</span>
          </a>

          {/* Project 2 */}
          <a className='project-item' href='#project2'>
            <div className='project-img-wrapper'>
              <div className='project-img-2'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>AI Art</h3>
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
              <p className='subtitle-sm'>
                Art created by training a Convolutional Neural Network
              </p>
            </div>
            <span className='count'>002</span>
          </a>

          {/* Project 3 */}
          <a className='project-item' href='#project3'>
            <div className='project-img-wrapper'>
              <div className='project-img-3'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>Project Three</h3>
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
              <p className='subtitle-sm'>Some quick description here</p>
            </div>
            <span className='count'>003</span>
          </a>

          {/* Project 4 */}
          <a className='project-item' href='#project4'>
            <div className='project-img-wrapper'>
              <div className='project-img-4'></div>
            </div>
            <div className='item-content'>
              <div className='title-row'>
                <h3 className='card-title'>Project Four</h3>
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
              <p className='subtitle-sm'>Another quick description here</p>
            </div>
            <span className='count'>004</span>
          </a>
        </div>
      </div>

      <Loader />
    </>
  )
}

export default Projects
