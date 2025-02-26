import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation' // Import the navigation component
import ProjectCTA from './ProjectCTA' // Import the CTA component
import './index.scss'
import './EcomCopy.scss' // Import the new SCSS file for product links

const EcomCopy = () => {
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
                '-',
                'C',
                'o',
                'm',
                'm',
                'e',
                'r',
                'c',
                'e',
                ' ',
                'C',
                'o',
                'p',
                'y',
              ]}
              idx={10}
            />
          </h1>
          <p>
            Converting product descriptions that showcase Bevel's premium
            grooming products.
          </p>
        </div>

        <div className='project-content'>
          <h2>Bevel Electric Shave Essentials Kit</h2>
          <h3>About the Project</h3>
          <p>
            I wrote the product copy for Bevel's newest Electric Shave
            Essentials Kit, featured on their website. This kit was designed to
            streamline the shaving routine for Bevel's audience, and my copy
            emphasized its convenience, effectiveness, and alignment with the
            brand's dedication to high-quality grooming products.
          </p>

          <h3>My Role</h3>
          <ul>
            <li>
              <strong>Highlighting Product Benefits:</strong> Crafted clear,
              concise, and persuasive product descriptions that focused on the
              kit's key features, including its ability to deliver a smooth,
              irritation-free shave.
            </li>
            <li>
              <strong>Tailoring to Bevel's Audience:</strong> Crafted language
              that resonated with Bevel's primary demographic, emphasizing
              precision, self-care, and style.
            </li>
            <li>
              <strong>Optimizing for Online Shopping:</strong> Balanced SEO
              considerations with engaging product details to enhance
              discoverability and inspire confidence in potential customers.
            </li>
          </ul>

          <div className='product-cta-container'>
            <a
              href='https://getbevel.com/products/bevel-electric-shave-essentials-kit'
              target='_blank'
              rel='noopener noreferrer'
              className='product-cta-button'
            >
              Check Out The Product
              <span className='button-arrow'>→</span>
            </a>
          </div>

          <h2>Bevel On-the-Go Bath and Body Gift Set (Holiday Promotion)</h2>
          <h3>About the Project</h3>
          <p>
            I developed the product copy for Bevel's On-the-Go Bath & Body Gift
            Set, a limited-edition holiday offering available on Target's
            website. This set featured Bevel's premium bath and body products in
            a travel-friendly format, designed for convenience and practicality
            during the holiday season.
          </p>

          <h3>My Role</h3>
          <ul>
            <li>
              <strong>Crafting a Holiday Narrative:</strong> Positioned the set
              as the perfect holiday gift for the man on the go, blending
              festive language with practicality.
            </li>
            <li>
              <strong>Driving Urgency:</strong> Used promotional language to
              highlight its limited-time availability and its appeal as a
              thoughtful gift option.
            </li>
            <li>
              <strong>Enhancing Product Appeal:</strong> Focused on the set's
              versatility and high-quality grooming essentials, ensuring it
              stood out among holiday gift options.
            </li>
          </ul>

          <h2>Intended Results & Impact</h2>
          <p>Both projects aimed to:</p>
          <ul>
            <li>
              <strong>Boost Product Sales:</strong> Emphasize the unique
              benefits and value of Bevel's products to encourage customer
              conversions.
            </li>
            <li>
              <strong>Maintain Brand Voice:</strong> Ensure consistency with
              Bevel's conversational and confident tone, tailored to their
              audience.
            </li>
            <li>
              <strong>Enhance the Shopping Experience:</strong> Create
              informative, engaging product descriptions to guide customers in
              making confident purchases.
            </li>
          </ul>

          {/* Add the CTA component before navigation */}
          <ProjectCTA />

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/ecom' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default EcomCopy
