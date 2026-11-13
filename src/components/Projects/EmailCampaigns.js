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
            holiday promotions. Each one had to make Bevel's offer clear in the
            brand's witty, conversational tone.
          </p>
        </div>

        <div className='project-content'>
          <section aria-labelledby='brief-heading' className='case-study-section'>
            <h2 id='brief-heading'>The brief</h2>
            <p>
              Give Bevel's audience a reason to shop during its seasonal sales.
              Each email had to explain the offer, show why the products were
              worth buying, and tell readers what to do next.
            </p>
            <dl className='case-study-facts'>
              <div>
                <dt>My role</dt>
                <dd>Copywriting: subject lines, preview text, and email body copy.</dd>
              </div>
              <div>
                <dt>The focus</dt>
                <dd>Bevel's grooming products, seasonal deals, and gift ideas.</dd>
              </div>
              <div>
                <dt>The challenge</dt>
                <dd>Balance limited-time urgency with a consistent, conversational brand voice.</dd>
              </div>
            </dl>
          </section>

          <section className='carousel-section' aria-labelledby='examples-heading'>
            <h2 id='examples-heading'>Selected email campaigns</h2>
            <p>
              Use the arrows to browse the emails. Select the center email to
              read it at full size.
            </p>
            <Carousel />
          </section>

          <section aria-labelledby='approach-heading' className='case-study-section'>
            <h2 id='approach-heading'>The thinking behind the copy</h2>
            <ul>
              <li>
                <strong>Give readers a reason to open.</strong> Subject lines
                and preview text named the seasonal offer and used
                limited-time language to get readers to open now.
              </li>
              <li>
                <strong>Connect the deal to product value.</strong> Body copy
                featured products such as the Bevel Trimmer and Shave
                Essentials. It sold their quality and their appeal as gifts, so
                the emails didn't rely on the discount alone.
              </li>
              <li>
                <strong>Keep the voice recognizable.</strong> Every email used
                Bevel's bold, conversational voice, whatever the sale. Each one
                ended with a clear call to action that sent readers to shop.
              </li>
            </ul>
          </section>

          <section aria-labelledby='outcomes-heading' className='case-study-section'>
            <h2 id='outcomes-heading'>Goals &amp; measurement</h2>
            <p>
              I wrote the campaigns to earn opens, clicks, and purchases in
              Bevel's voice. I don't have the campaign performance data, so
              these are goals, not reported results.
            </p>
            <p>
              To measure them, I would compare open rates across subject lines,
              click-through rates on each call to action, and the share of
              clicks that ended in a purchase.
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
