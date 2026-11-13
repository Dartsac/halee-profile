import React, { useEffect } from 'react'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation'
import ProjectCTA from './ProjectCTA'
import SmsGallery from './SmsGallery' // Import the new SMS Gallery component
import './index.scss'

const SmsStrategies = () => {
  useEffect(() => {
    // Enable scrolling when on project detail pages
    document.body.classList.add('project-page-active')

    return () => {
      // Remove the class when component unmounts
      document.body.classList.remove('project-page-active')
    }
  }, [])

  return (
    <>
      <div className='container projects-page project-detail-page'>
        <div className='text-zone'>
          <h1>
            SMS Strategies
          </h1>
          <p>
            Text message campaigns that sent Bevel customers to shop during its
            biggest sales.
          </p>
        </div>

        <div className='project-content'>
          {/* First image - top left position */}
          <SmsGallery position='top-left' />

          <h2>About the Project</h2>
          <p>
            I wrote SMS campaigns for Black Friday, Cyber Monday, the Fall Sale,
            and holiday promotions. Each message had to be short, sound like
            Bevel, and tell customers what to do. The campaigns sent customers
            to the website, promoted product bundles, and used deadlines to get
            people to buy during the sale.
          </p>

          {/* Second image - top right position */}
          <SmsGallery position='top-right' />

          <h2>Key Campaign Strategies</h2>
          <ul>
            <li>
              <strong>Personal messages.</strong> The copy spoke to customers
              directly, in Bevel's conversational tone.
            </li>
            <li>
              <strong>Urgency.</strong> Phrases like "Don't Miss Out! Limited
              Time Offer" pushed customers to act before the deal ended.
            </li>
            <li>
              <strong>Short calls to action.</strong> Each text pointed
              customers to Bevel's website or to a specific product bundle.
            </li>
          </ul>

          {/* Third image - bottom left position */}
          <SmsGallery position='bottom-left' />

          <h2>Intended Results & Impact</h2>
          <p>
            I don't have performance data for these campaigns. I wrote them
            with these goals:
          </p>
          <ul>
            <li>
              <strong>Website traffic.</strong> Direct links to sale and product
              pages let customers shop in one tap.
            </li>
            <li>
              <strong>Sales during promotions.</strong> Messages led with
              exclusive deals and product bundles.
            </li>
            <li>
              <strong>Engagement.</strong> Messages arrived when each sale was
              live, which kept Bevel on customers' minds.
            </li>
            <li>
              <strong>Retention.</strong> Messages stayed true to Bevel's values
              of community, self-care, and style, so customers kept coming
              back.
            </li>
          </ul>

          {/* Fourth image - bottom right position */}
          <SmsGallery position='bottom-right' />

          {/* Add the CTA component before navigation */}
          <ProjectCTA />

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/sms' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default SmsStrategies
