import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import './index.scss'

const SmsStrategies = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Enable scrolling when on project detail pages
    document.body.classList.add('project-page-active')

    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timer)
      // Remove the class when component unmounts
      document.body.classList.remove('project-page-active')
    }
  }, [])

  return (
    <>
      <div className='container projects-page project-detail-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={[
                'S',
                'M',
                'S',
                ' ',
                'S',
                't',
                'r',
                'a',
                't',
                'e',
                'g',
                'i',
                'e',
                's',
              ]}
              idx={15}
            />
          </h1>
          <p>
            Strategic SMS campaign content to engage customers and drive
            conversions.
          </p>
        </div>

        <div className='project-content'>
          {/* SMS strategies content goes here */}
          <h2>About the Project</h2>
          <p>Content coming soon...</p>
        </div>
      </div>
      <Loader />
    </>
  )
}

export default SmsStrategies
