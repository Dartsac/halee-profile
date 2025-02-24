import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation' // Import the navigation component
import './index.scss'

const SmsStrategies = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    // Enable scrolling when on project detail pages
    document.body.classList.add('project-page-active')

    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timer)
      // Remove the class when component unmounts
      document.body.classList.remove('project-page-active')
    }
  }, [])

  return (
    <>
      <div className='container projects-page project-detail-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={[
                'S',
                'M',
                'S',
                ' ',
                'S',
                't',
                'r',
                'a',
                't',
                'e',
                'g',
                'i',
                'e',
                's',
              ]}
              idx={10}
            />
          </h1>
          <p>
            Strategic SMS campaign content to engage customers and drive
            conversions during key sales events.
          </p>
        </div>

        <div className='project-content'>
          <h2>About the Project</h2>
          <p>
            I crafted SMS campaigns to support key sales events such as Black
            Friday, Cyber Monday, Fall Sale, and Holiday Promotions. Each
            campaign was tailored to Bevel's brand voice, delivering concise,
            engaging, and actionable messages designed to capture attention and
            encourage immediate responses. These SMS campaigns focused on
            driving website traffic, promoting product bundles, and fostering a
            sense of urgency to maximize customer engagement during pivotal
            shopping periods.
          </p>

          <h2>Key Campaign Strategies</h2>
          <ul>
            <li>
              <strong>Personalized Messaging:</strong> Crafted SMS copy that
              addressed customers directly and reflected Bevel's conversational
              and engaging tone.
            </li>
            <li>
              <strong>Urgency and Exclusivity:</strong> Emphasized
              time-sensitive promotions with phrases like "Don't Miss Out!
              Limited Time Offer" to drive instant responses.
            </li>
            <li>
              <strong>Clear and Concise CTAs:</strong> Focused on short,
              action-oriented language that guided customers to shop Bevel's
              website or explore specific product bundles.
            </li>
          </ul>

          <h2>Intended Results & Impact</h2>
          <p>
            While specific campaign metrics are unavailable, each SMS campaign
            was strategically designed to:
          </p>
          <ul>
            <li>
              <strong>Drive Traffic to Bevel's Website:</strong> Provided direct
              links to sales and product pages to simplify the customer journey
              and encourage quick action.
            </li>
            <li>
              <strong>Boost Sales During Key Promotions:</strong> Highlighted
              exclusive deals and product bundles to maximize conversions.
            </li>
            <li>
              <strong>Enhance Customer Engagement:</strong> Delivered timely and
              relevant messages to keep Bevel top-of-mind and build stronger
              brand connections.
            </li>
            <li>
              <strong>Increase Customer Retention:</strong> Fostered loyalty by
              keeping messaging aligned with Bevel's value of community,
              self-care, and style.
            </li>
          </ul>

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/sms' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default SmsStrategies
