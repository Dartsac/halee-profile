import React, { useState } from 'react'
import './index.scss'

// Import your five images
import Img1 from '../../assets/images/email/img1.png'
import Img2 from '../../assets/images/email/img2.png'
import Img3 from '../../assets/images/email/img3.png'
import Img4 from '../../assets/images/email/img4.png'
import Img5 from '../../assets/images/email/img5.png'

// Our fixed array of five images.
const images = [Img1, Img2, Img3, Img4, Img5]

const Carousel = () => {
  // The offset determines which image is “in focus” (slot 1 is the leftmost, 2, … 5)
  // In our CSS, we have classes for gallery-item-1 through gallery-item-5.
  const [offset, setOffset] = useState(0)
  // This flag will add a "transitioning" class to trigger the CSS transition.
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    // Wait for the CSS transition (0.4s) before updating the offset.
    setTimeout(() => {
      setOffset((prev) => (prev + 1) % images.length)
      setIsAnimating(false)
    }, 400)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setOffset((prev) => (prev - 1 + images.length) % images.length)
      setIsAnimating(false)
    }, 400)
  }

  return (
    <div className='gallery'>
      <div className='gallery-container'>
        {images.map((img, i) => {
          // Compute each image’s relative position (0 to 4) based on the offset.
          const relativePos = (i - offset + images.length) % images.length
          // We want to assign classes 1 through 5 (gallery-item-1, gallery-item-2, etc.)
          const slotNumber = relativePos + 1
          // Optionally add a "transitioning" class while animating.
          const extraClass = isAnimating ? ' transitioning' : ''
          const className = `gallery-item-${slotNumber}${extraClass}`
          return (
            <img
              key={img}
              className={`gallery-item ${className}`}
              src={img}
              alt={`img${i + 1}`}
            />
          )
        })}
      </div>
      <div className='gallery-controls'>
        <button className='gallery-controls-previous' onClick={handlePrev}>
          previous
        </button>
        <button className='gallery-controls-next' onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  )
}

export default Carousel
