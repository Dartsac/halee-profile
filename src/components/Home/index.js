import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import './index.scss'
import Loader from '../Loader'

const descriptors = ['skilled writer.', 'avid reader.', 'sharp editor.']

const Home = () => {
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

  return (
    <>
      <div className='container home-page'>
        <div className='text-zone'>
          <h1>Halee McCray</h1>
          <h2>
            <br />
            <span>{currentDescriptor}</span>
          </h2>
          <Link
            to='/contact'
            className='flat-button'
            onClick={() => window.scrollTo(0, 0)}
          >
            CONTACT ME
          </Link>
        </div>
        <Logo />
      </div>
      <Loader />
    </>
  )
}

export default Home
