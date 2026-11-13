import React, { useEffect } from 'react'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation' // Import the navigation component
import ProjectCTA from './ProjectCTA' // Import the CTA component
import './index.scss'
import './EcomCopy.scss' // Import the new SCSS file for product links

const EcomCopy = () => {
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
            E-Commerce Copy
          </h1>
          <p>
            Product descriptions I wrote to sell Bevel's grooming products.
          </p>
        </div>

        <div className='project-content'>
          <h2>Bevel Electric Shave Essentials Kit</h2>
          <h3>About the Project</h3>
          <p>
            I wrote the product copy for Bevel's Electric Shave Essentials Kit,
            sold on Bevel's website. The kit puts a full shaving routine in one
            set. My copy focused on how convenient it is, how well it works, and
            Bevel's standard for quality.
          </p>

          <h3>My Role</h3>
          <ul>
            <li>
              <strong>Product benefits.</strong> Short, persuasive descriptions
              covered the kit's main features, including a smooth,
              irritation-free shave.
            </li>
            <li>
              <strong>Bevel's audience.</strong> The language spoke to Bevel's
              core customers and focused on precision, self-care, and style.
            </li>
            <li>
              <strong>Online shopping.</strong> The product details included the
              keywords shoppers search for and gave them enough information to
              buy with confidence.
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
            I wrote the product copy for Bevel's On-the-Go Bath & Body Gift Set,
            a limited-edition holiday set sold on Target's website. It packed
            Bevel's bath and body products in travel sizes for the holidays.
          </p>

          <h3>My Role</h3>
          <ul>
            <li>
              <strong>A holiday story.</strong> The copy presented the set as a
              practical holiday gift for the man on the go, in festive
              language.
            </li>
            <li>
              <strong>Urgency.</strong> Promotional language pointed out that
              the set was only available for a limited time and made a
              thoughtful gift.
            </li>
            <li>
              <strong>Product appeal.</strong> The copy focused on the range of
              grooming essentials in the set so it stood out from other holiday
              gifts.
            </li>
          </ul>

          <h2>Intended Results & Impact</h2>
          <p>Both projects had the same goals:</p>
          <ul>
            <li>
              <strong>Sales.</strong> Show the benefits and value of Bevel's
              products so customers buy.
            </li>
            <li>
              <strong>Brand voice.</strong> Keep Bevel's conversational,
              confident tone.
            </li>
            <li>
              <strong>Shopping experience.</strong> Give customers the
              information they need to buy with confidence.
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
