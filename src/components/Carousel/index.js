import React, { useState } from 'react'
import Lightbox from '../Lightbox'
import emailSamples from './emailSamples'
import './index.scss'

// Slot settings by position relative to the centered email (slot 2).
const positions = [-30, -5, 30, 65, 90]
const scales = [0.9, 1, 1.1, 1, 0.9]
const opacities = [0.5, 0.7, 1, 0.7, 0.5]
const CENTER_SLOT = 2

const Carousel = () => {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [openSampleIndex, setOpenSampleIndex] = useState(null)

  const count = emailSamples.length
  const centerIndex = (offset + CENTER_SLOT) % count
  const centerSample = emailSamples[centerIndex]

  const rotateBy = (step) => {
    if (isAnimating) return
    setIsAnimating(true)
    setOffset((prev) => (prev + step + count) % count)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleItemClick = (relativePos, index) => {
    if (relativePos === CENTER_SLOT) {
      setOpenSampleIndex(index)
    } else {
      // Bring a side email to the center before it can be enlarged.
      rotateBy(relativePos - CENTER_SLOT)
    }
  }

  const openSample = openSampleIndex === null ? null : emailSamples[openSampleIndex]

  return (
    <div className='gallery'>
      <div className='gallery-container'>
        {emailSamples.map((sample, i) => {
          const relativePos = (i - offset + count) % count
          const isCenter = relativePos === CENTER_SLOT
          const zIndex = isCenter ? 3 : relativePos === 1 || relativePos === 3 ? 2 : 1

          const style = {
            transform: `translate(calc(${positions[relativePos]}% - 50%), -50%) scale(${scales[relativePos]})`,
            opacity: opacities[relativePos],
            zIndex,
          }

          return (
            <button
              key={sample.src}
              type='button'
              className={`gallery-item${isCenter ? ' is-center' : ''}`}
              style={style}
              onClick={() => handleItemClick(relativePos, i)}
              tabIndex={isCenter ? 0 : -1}
              aria-hidden={isCenter ? undefined : 'true'}
              aria-label={
                isCenter
                  ? `Enlarge email ${i + 1} of ${count}: ${sample.title}`
                  : undefined
              }
            >
              <img src={sample.src} alt={isCenter ? sample.alt : ''} />
              {isCenter && (
                <span className='gallery-item-hint' aria-hidden='true'>
                  View larger
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className='gallery-controls'>
        <button
          type='button'
          className='gallery-controls-previous'
          onClick={() => rotateBy(-1)}
          aria-label='Previous email'
        ></button>
        <button
          type='button'
          className='gallery-controls-next'
          onClick={() => rotateBy(1)}
          aria-label='Next email'
        ></button>
      </div>
      <p className='gallery-caption' aria-live='polite'>
        Email {centerIndex + 1} of {count}: {centerSample.title}
      </p>

      {openSample && (
        <Lightbox
          title={openSample.title}
          image={{ src: openSample.src, alt: openSample.alt }}
          onClose={() => setOpenSampleIndex(null)}
        >
          <details className='sample-transcript'>
            <summary>Read the email text</summary>
            {openSample.transcript.map((block, blockIndex) => (
              <p key={blockIndex}>{block}</p>
            ))}
          </details>
        </Lightbox>
      )}
    </div>
  )
}

export default Carousel
