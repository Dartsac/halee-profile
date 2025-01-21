import React from 'react'
import './index.scss'

const Loader = () => {
  return (
    <div className='loader-overlay'>
      <div className='loader-container'>
        {[...Array(16)].map((_, i) => (
          <div className='dot' key={i} />
        ))}
      </div>
    </div>
  )
}

export default Loader
