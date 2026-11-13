import React, { useState } from 'react'
import Lightbox from '../Lightbox'
import './SmsGallery.scss'

import Img1 from '../../assets/images/sms/img1.webp'
import Img2 from '../../assets/images/sms/img2.webp'
import Img3 from '../../assets/images/sms/img3.webp'
import Img4 from '../../assets/images/sms/img4.webp'

// Alt text reproduces each message exactly as shown in the screenshot.
const smsSamples = {
  'top-left': {
    src: Img1,
    title: 'Fall Sale SMS',
    alt: 'Bevel SMS: “Bevel: Cooler temps, fresher style. 20% off everything at Bevel this fall 🍂. Limited time only. Free shipping on U.S. orders over $60+ 👉 https://sms.getbevel.com/rcRUbQ Text STOP to opt-out”',
  },
  'top-right': {
    src: Img2,
    title: 'Valentine’s Day SMS',
    alt: 'Bevel SMS: “Bevel: The perfect Valentine’s gift? The Bevel Electric Shave Essentials Kit for only $104.95. Because confidence starts with a clean shave. Don’t miss it! https://sms.getbevel.com/HQrUb3 Text STOP to opt-out”',
  },
  'bottom-left': {
    src: Img3,
    title: 'Holiday Sale SMS',
    alt: 'Bevel SMS: “Bevel: Make this holiday your smoothest yet! 🎁 Get 30% off sitewide and free U.S. shipping on $60 at checkout (while supplies last). Shop early, stay fresh 👉 https://sms.getbevel.com/yUYVbh Text STOP to opt-out”',
  },
  'bottom-right': {
    src: Img4,
    title: 'Black Friday SMS',
    alt: 'Bevel SMS: “Bevel: Black Friday is on! 🔥 30% off sitewide & FREE shipping with no minimum. Don’t miss Bevel’s biggest sale of the year! Save Now! 👉 https://sms.getbevel.com/WGwNbS Text STOP to opt-out”',
  },
}

const SmsGallery = ({ position }) => {
  const [isEnlarged, setIsEnlarged] = useState(false)
  const sample = smsSamples[position] || smsSamples['top-left']

  return (
    <div className={`sms-image-container ${position}`}>
      <button
        type='button'
        className='sms-image-wrapper'
        onClick={() => setIsEnlarged(true)}
      >
        <img src={sample.src} alt={sample.alt} className='sms-image' />
        <span className='sms-enlarge-hint'>View larger</span>
      </button>

      {isEnlarged && (
        <Lightbox
          title={sample.title}
          image={{ src: sample.src, alt: sample.alt }}
          onClose={() => setIsEnlarged(false)}
        />
      )}
    </div>
  )
}

export default SmsGallery
