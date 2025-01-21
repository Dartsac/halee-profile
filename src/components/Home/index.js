import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import Logo from '../Logo'
import './index.scss'

const descriptors = ['skilled writer.', 'avid reader.', 'sharp editor.']

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = [' ', 'H', 'a', 'l', 'e', 'e']
  const [currentDescriptor, setCurrentDescriptor] = useState('')
  const [descriptorIndex, setDescriptorIndex] = useState(0)
  const [typingPhase, setTypingPhase] = useState('typing')
  const typingSpeed = 100
  const erasingSpeed = 50
  const pause = 1000
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsAnimating(true)
    }, 3000)

    return () => clearTimeout(delayTimer)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    let timeout

    if (typingPhase === 'typing') {
      if (currentDescriptor.length < descriptors[descriptorIndex].length) {
        timeout = setTimeout(() => {
          setCurrentDescriptor(
            descriptors[descriptorIndex].slice(0, currentDescriptor.length + 1),
          )
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setTypingPhase('erasing')
        }, pause)
      }
    } else if (typingPhase === 'erasing') {
      if (currentDescriptor.length > 0) {
        timeout = setTimeout(() => {
          setCurrentDescriptor(
            descriptors[descriptorIndex].slice(0, currentDescriptor.length - 1),
          )
        }, erasingSpeed)
      } else {
        setTypingPhase('typing')
        setDescriptorIndex((prevIndex) => (prevIndex + 1) % descriptors.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentDescriptor, typingPhase, descriptorIndex, isAnimating])

  useEffect(() => {
    if (!isAnimating) return // Do nothing until animation starts
  }, [currentDescriptor, isAnimating])

  // Existing effect for changing letter class after 4 seconds
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
          <span className={`${letterClass} _12`}>i</span>
          <span className={`${letterClass} _13`}>,</span>
          <br />
          <span className={`${letterClass} _14`}>I</span>
          <span className={`${letterClass} _15`}>'</span>
          <span className={`${letterClass} _16`}>m</span>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={17}
          />
          <br />
          <span>{currentDescriptor}</span>
        </h1>
        <h2>Crafting Words That Inspire</h2>
        <Link to='/contact' className='flat-button'>
          CONTACT ME
        </Link>
      </div>
      <Logo />
    </div>
  )
}

export default Home
