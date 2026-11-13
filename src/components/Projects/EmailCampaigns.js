import React, { useEffect } from 'react'
import Loader from '../Loader'
import Carousel from '../Carousel'
import ProjectNavigation from './ProjectNavigation'
import ProjectCTA from './ProjectCTA'
import './index.scss'
import './EmailCampaigns.scss'

const EmailCampaigns = () => {
  useEffect(() => {
    document.body.classList.add('project-page-active')
    return () => document.body.classList.remove('project-page-active')
  }, [])

  return (
    <>
      <div className='container projects-page project-detail-page email-case-study'>
        <div className='text-zone'>
          <p className='case-study-label'>Bevel · Email copywriting</p>
          <h1>Seasonal offers. A consistent brand voice.</h1>
          <p>
            Email campaigns for Black Friday, Cyber Monday, Fall Sale, and
            holiday promotions—written to make Bevel’s offers clear without
            losing its witty, conversational tone.
          </p>
        </div>

        <div className='project-content'>
          <section aria-labelledby='brief-heading' className='case-study-section'>
            <h2 id='brief-heading'>The brief</h2>
            <p>
              Give Bevel’s audience a reason to shop during key seasonal sales.
              Each email needed to communicate the offer, highlight product
              value, and guide readers toward a clear next step.
            </p>
            <dl className='case-study-facts'>
              <div>
                <dt>My role</dt>
                <dd>Copywriting: subject lines, preview text, and email body copy.</dd>
              </div>
              <div>
                <dt>The focus</dt>
                <dd>Bevel’s grooming products, seasonal deals, and gifting opportunities.</dd>
              </div>
              <div>
                <dt>The challenge</dt>
                <dd>Balance limited-time urgency with a consistent, conversational brand voice.</dd>
              </div>
            </dl>
          </section>

          <section className='carousel-section' aria-labelledby='examples-heading'>
            <h2 id='examples-heading'>Selected email campaigns</h2>
            <p>Browse the campaign examples below to see the copy in context.</p>
            <Carousel />
          </section>

          <section aria-labelledby='approach-heading' className='case-study-section'>
            <h2 id='approach-heading'>The thinking behind the copy</h2>
            <ul>
              <li>
                <strong>Give readers a reason to open.</strong> Subject lines
                and preview text highlighted the seasonal offer, using urgency
                and exclusivity to make the timing relevant.
              </li>
              <li>
                <strong>Connect the deal to product value.</strong> Body copy
                highlighted products such as the Bevel Trimmer and Shave
                Essentials, emphasizing quality and gifting potential rather
                than relying on the discount alone.
              </li>
              <li>
                <strong>Keep the voice recognizable.</strong> Bold,
                conversational language carried Bevel’s personality through
                different sales moments, with clear calls to action to guide
                readers toward shopping.
              </li>
            </ul>
          </section>

          <section aria-labelledby='outcomes-heading' className='case-study-section'>
            <h2 id='outcomes-heading'>Goals &amp; measurement</h2>
            <p>
              The campaigns were designed to encourage opens, clicks, and
              purchases while reinforcing Bevel’s brand voice. Campaign
              performance metrics are not available, so these are objectives,
              not reported results.
            </p>
            <p>
              To evaluate performance, I would look at open rates for subject
              line testing, click-through rates for message and CTA engagement,
              and conversion rates for the purchase journey.
            </p>
          </section>

          <ProjectCTA />
          <ProjectNavigation currentProject='/projects/email' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default EmailCampaigns
