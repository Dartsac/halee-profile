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

// Updated slot settings:
// - Change the positions to spread the images further apart.
//   (Here we use [10, 30, 50, 70, 90], so that the leftmost image
//    is at 10% and the rightmost at 90% of the container's width.)
// - The scales remain similar (with a slightly larger center image)
//   so that the center image appears larger.
const positions = [-30, -5, 30, 65, 90]
const scales = [0.9, 1, 1.1, 1, 0.9]
const opacities = [0.5, 0.7, 1, 0.7, 0.5]

const Carousel = () => {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setOffset((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setOffset((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <div className='gallery'>
      <div className='gallery-container'>
        {images.map((img, i) => {
          // Calculate the relative position (0 to 4) for this image.
          const relativePos = (i - offset + images.length) % images.length

          // Compute the z-index: the center image (relativePos === 2) should appear on top.
          const zIndex =
            relativePos === 2
              ? 3
              : relativePos === 1 || relativePos === 3
                ? 2
                : 1

          // The inline style:
          // - translateX: moves the image horizontally based on the positions array.
          // - translateY(-50%) centers it vertically.
          // - scale: adjusts its size.
          const style = {
            transform: `translate(calc(${positions[relativePos]}% - 50%), -50%) scale(${scales[relativePos]})`,
            opacity: opacities[relativePos],
            zIndex,
          }

          return (
            <img
              key={img}
              className='gallery-item'
              style={style}
              src={img}
              alt={`img${i + 1}`}
            />
          )
        })}
      </div>
      <div className='gallery-controls'>
        <button
          className='gallery-controls-previous'
          onClick={handlePrev}
        ></button>
        <button className='gallery-controls-next' onClick={handleNext}></button>
      </div>
    </div>
  )
}

export default Carousel
