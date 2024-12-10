import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useState } from 'react'
import { useEffect } from 'react'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='container about-page'>
      <div className='text-zone'>
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
            idx={15}
          />
        </h1>
        <p>
          Halee McCray is a dynamic creative writer and editor based in Atlanta,
          blending creativity with analytical insights to forge impactful
          branding experiences.
        </p>
        <p>
          With a Bachelor of Science in Psychology from Georgia State
          University, Halee leverages her knowledge in creative writing and
          consumer psychology to connect deeply with audiences.
        </p>
        <p>
          Certified in Google Analytics and proficient in keyword research and
          SEMrush, she expertly tailors content to drive engagement. Her
          experience includes crafting compelling copy for Bevel and various
          freelance editing projects, ensuring every word resonates and delivers
          results.
        </p>
      </div>
    </div>
  )
}

export default About
