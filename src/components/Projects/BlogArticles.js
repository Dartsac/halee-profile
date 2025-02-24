import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation' // Import the navigation component
import './index.scss'

const BlogArticles = () => {
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
                'B',
                'l',
                'o',
                'g',
                ' ',
                'A',
                'r',
                't',
                'i',
                'c',
                'l',
                'e',
                's',
              ]}
              idx={10}
            />
          </h1>
          <p>
            Expert grooming advice articles targeting specific needs of Bevel's
            audience.
          </p>
        </div>

        <div className='project-content'>
          <h2>About the Project</h2>
          <p>
            As part of my collaboration with Bevel, I developed two blog
            articles addressing key grooming concerns for Bevel's audience of
            young Black men:
          </p>
          <ul>
            <li>
              <strong>
                "The Best Shaving Routine for Razor Bump Prevention"
              </strong>
            </li>
            <li>
              <strong>
                "The Best Solutions for Ingrown Hairs After Shaving"
              </strong>
            </li>
          </ul>
          <p>
            These articles were developed to align with Bevel's mission of
            providing actionable, expert advice while maintaining an engaging
            and relatable tone. They are part of Bevel's ongoing content
            strategy and were designed to support their digital marketing
            efforts.
          </p>

          <h2>My Writing Process</h2>
          <ul>
            <li>
              <strong>Audience-Centric Research:</strong> I conducted in-depth
              research into the specific challenges Black men face with razor
              bumps and ingrown hairs, consulting dermatological sources,
              customer insights, and grooming forums to ensure the content was
              accurate and relatable.
            </li>
            <li>
              <strong>SEO Optimization:</strong> Strategically incorporated
              keywords such as "razor bump prevention," "ingrown hair
              solutions," and "shaving tips for Black men" to enhance
              discoverability while maintaining natural readability.
            </li>
            <li>
              <strong>Tone Alignment:</strong> Kept the tone engaging,
              educational, and relatable to connect with Bevel's audience while
              reinforcing the brand's authority in grooming.
            </li>
          </ul>

          <h2>Intended Results & Impact</h2>
          <p>The blogs were created with the following goals in mind:</p>
          <ul>
            <li>
              <strong>Drive Website Traffic:</strong> Leverage SEO strategies to
              attract new visitors searching for grooming advice.
            </li>
            <li>
              <strong>Build Brand Authority:</strong> Establish Bevel as a go-to
              resource for solving common grooming challenges faced by Black
              men.
            </li>
            <li>
              <strong>Encourage Product Exploration:</strong> Seamlessly
              integrate mentions of Bevel's products as effective solutions for
              razor bumps and ingrown hairs.
            </li>
            <li>
              <strong>Strengthen Community Connections:</strong> Reinforce
              Bevel's dedication to addressing real grooming concerns faced by
              their audience.
            </li>
          </ul>

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/blog' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default BlogArticles
