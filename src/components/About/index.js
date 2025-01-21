import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useState } from 'react'
import { useEffect } from 'react'
import Headshot from '../../assets/images/headshot1.jpeg'
import Loader from '../Loader'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
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
            I’m a proud first-generation Georgia State University alumna with a
            serious passion for writing and editing. My mission? To make my
            readers *feel* something—anything! Whether it’s a burst of joy, a
            tear (hopefully happy), or that perfect “OMG” or “LOL” moment, I aim
            to spark genuine emotion.
          </p>
          <p>
            With a degree in psychology, I understand that connecting with
            people starts with knowing what makes them tick. When you tap into
            what someone truly cares about, that’s when they believe in your
            brand. From selling products and informing the public to crafting an
            entertaining blog, the key is creating content that inspires thought
            and emotion.
          </p>
          <p>
            But I’m not just about tugging at heartstrings. I’m Google Analytics
            certified and know my way around keyword research (SemRush, Google
            Keyword Planner—you name it). I craft content that not only sounds
            great but actually delivers measurable results. I’ve worked with
            brands like Walker & Company and tackled a variety of freelance
            editing projects, ensuring every word lands just right to get your
            audience engaged and taking action.
          </p>
          <p>
            Let’s connect and see how I can help you craft content that speaks
            directly to your audience.
          </p>
        </div>

        {/* <div className='headshot'></div> */}

        <img className='headshot' src={Headshot} alt='headshot' />
      </div>
      <Loader />
    </>
  )
}

export default About
