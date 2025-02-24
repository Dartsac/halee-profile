import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import './index.scss'

const EcomCopy = () => {
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
              strArray={[
                'E',
                '-',
                'C',
                'o',
                'm',
                'm',
                'e',
                'r',
                'c',
                'e',
                ' ',
                'C',
                'o',
                'p',
                'y',
              ]}
              idx={15}
            />
          </h1>
          <p>
            Persuasive product descriptions and copy that convert browsers into
            buyers.
          </p>
        </div>

        <div className='project-content'>
          {/* E-commerce copy content goes here */}
          <h2>About the Project</h2>
          <p>Content coming soon...</p>
        </div>
      </div>
      <Loader />
    </>
  )
}

export default EcomCopy
