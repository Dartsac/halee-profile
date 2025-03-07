// src/components/Projects/SmsGallery.js
import React from 'react'
import './SmsGallery.scss'

// Import SMS screenshots
import Img1 from '../../assets/images/sms/img1.webp'
import Img2 from '../../assets/images/sms/img2.webp'
import Img3 from '../../assets/images/sms/img3.webp'
import Img4 from '../../assets/images/sms/img4.webp'

const SmsGallery = ({ position }) => {
  // Determine which image to show based on position prop
  const getImage = () => {
    switch (position) {
      case 'top-left':
        return { src: Img1, alt: 'SMS Campaign Example 1' }
      case 'top-right':
        return { src: Img2, alt: 'SMS Campaign Example 2' }
      case 'bottom-left':
        return { src: Img3, alt: 'SMS Campaign Example 3' }
      case 'bottom-right':
        return { src: Img4, alt: 'SMS Campaign Example 4' }
      default:
        return { src: Img1, alt: 'SMS Campaign Example' }
    }
  }

  const image = getImage()

  // Determine the position class
  const positionClass = `sms-image-container ${position}`

  return (
    <div className={positionClass}>
      <div className='sms-image-wrapper'>
        <img src={image.src} alt={image.alt} className='sms-image' />
      </div>
    </div>
  )
}

export default SmsGallery
