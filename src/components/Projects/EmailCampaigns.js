import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import Carousel from '../Carousel' // Reusable carousel component
import './EmailCampaigns.scss'
import './index.scss'

import Hero from '../../assets/images/email/head.png'
import Content from '../../assets/images/email/email.png'

const EmailCampaigns = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className='email-campaigns-page'>
        {/* Hero or banner section */}
        <section className='hero-section'>
          <div className='hero-image-wrapper'>
            <img
              src={Hero}
              alt='Hero for Email Campaigns'
              className='hero-image'
            />
            <div className='hero-text-overlay'>
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
                  idx={12}
                />
              </h1>
              <p>Engaging & On-Brand Email Copy for Key Sales Events</p>
            </div>
          </div>
        </section>

        {/* About the Project */}
        <section className='project-details'>
          <h2>About the Project</h2>
          <p>
            I crafted engaging and on-brand email campaigns for key sales
            events, including Black Friday, Cyber Monday, Fall Sale, and Holiday
            Promotions. Each campaign was designed to captivate Bevel’s target
            audience while maintaining Bevel’s signature witty, conversational
            tone. My work focused on combining persuasive copywriting with clear
            calls-to-action to drive conversions.
          </p>
          <section className='carousel-section'>
            <h2>Email Examples I Wrote</h2>
            <Carousel />
          </section>

          {/* <div className='inline-image'> */}
          {/*   <img */}
          {/*     src={Content} */}
          {/*     alt='Email Writing Process' */}
          {/*     className='inline-img' */}
          {/*   /> */}
          {/* </div> */}
          <h2>Writing Process</h2>
          <p>
            For each email, I developed high-impact subject lines, preview text,
            and email body copy that highlighted Bevel’s most significant deals
            of the year. My approach included:
          </p>
          <ul>
            <li>
              Focus on urgency and exclusivity: Leveraged limited-time offers
              and countdown language to encourage quick action.
            </li>
            <li>
              Highlighting product value: Showcased Bevel’s flagship products,
              like the Bevel Trimmer and Shave Essentials, emphasizing their
              premium quality and gifting potential.
            </li>
            <li>
              Tone: Infused emails with bold, energetic language that appealed
              to Bevel’s audience.
            </li>
          </ul>

          <h2>Intended Impact</h2>
          <p>
            While specific campaign metrics are unavailable, each email campaign
            was crafted with the goal of achieving the following:
          </p>
          <ul>
            <li>
              Increasing Engagement: Designed subject lines and preview text to
              capture attention and drive higher open rates, ensuring Bevel’s
              audience remained engaged during key sales periods.
            </li>
            <li>
              Boosting Brand Awareness: Each campaign reinforced Bevel’s
              presence in a competitive market, ensuring the brand remained
              top-of-mind during key shopping periods.
            </li>
            <li>
              Driving Conversions: Highlighted the unique value of Bevel’s
              products, such as the Bevel Trimmer and curated holiday bundles,
              with persuasive calls-to-action encouraging customers to complete
              purchases.
            </li>
            <li>
              Supporting Seasonal Sales: Strategically timed messaging and
              promotions to align with shopping trends, aiming to maximize sales
              during Black Friday, Cyber Monday, and holiday shopping peaks.
            </li>
          </ul>
        </section>
      </div>
      <Loader />
    </>
  )
}

export default EmailCampaigns
