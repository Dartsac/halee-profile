import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import Carousel from '../Carousel' // Reusable carousel component
import ProjectNavigation from './ProjectNavigation' // Import the new navigation component
import './EmailCampaigns.scss'
import './index.scss'

const EmailCampaigns = () => {
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
                'E',
                'm',
                'a',
                'i',
                'l',
                ' ',
                'C',
                'a',
                'm',
                'p',
                'a',
                'i',
                'g',
                'n',
                's',
              ]}
              idx={11}
            />
          </h1>
          <p>
            I crafted engaging and on-brand email campaigns for key sales
            events, including Black Friday, Cyber Monday, Fall Sale, and Holiday
            Promotions. Each campaign was designed to captivate Bevel's target
            audience while maintaining Bevel's signature witty, conversational
            tone. My work focused on combining persuasive copywriting with clear
            calls-to-action to drive conversions.
          </p>
        </div>

        <div className='project-content'>
          <section className='carousel-section'>
            <h2>Email Examples I Wrote</h2>
            <Carousel />
          </section>

          <h2>Writing Process</h2>
          <p>
            For each email, I developed high-impact subject lines, preview text,
            and email body copy that highlighted Bevel's most significant deals
            of the year. My approach included:
          </p>
          <ul>
            <li>
              <strong>Focus on urgency and exclusivity:</strong> Leveraged
              limited-time offers and countdown language to encourage quick
              action.
            </li>
            <li>
              <strong>Highlighting product value:</strong> Showcased Bevel's
              flagship products, like the Bevel Trimmer and Shave Essentials,
              emphasizing their premium quality and gifting potential.
            </li>
            <li>
              <strong>Tone:</strong> Infused emails with bold, energetic
              language that appealed to Bevel's audience.
            </li>
          </ul>

          <h2>Intended Impact</h2>
          <p>
            While specific campaign metrics are unavailable, each email campaign
            was crafted with the goal of achieving the following:
          </p>
          <ul>
            <li>
              <strong>Increasing Engagement:</strong> Designed subject lines and
              preview text to capture attention and drive higher open rates,
              ensuring Bevel's audience remained engaged during key sales
              periods.
            </li>
            <li>
              <strong>Boosting Brand Awareness:</strong> Each campaign
              reinforced Bevel's presence in a competitive market, ensuring the
              brand remained top-of-mind during key shopping periods.
            </li>
            <li>
              <strong>Driving Conversions:</strong> Highlighted the unique value
              of Bevel's products, such as the Bevel Trimmer and curated holiday
              bundles, with persuasive calls-to-action encouraging customers to
              complete purchases.
            </li>
            <li>
              <strong>Supporting Seasonal Sales:</strong> Strategically timed
              messaging and promotions to align with shopping trends, aiming to
              maximize sales during Black Friday, Cyber Monday, and holiday
              shopping peaks.
            </li>
          </ul>

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/email' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default EmailCampaigns
