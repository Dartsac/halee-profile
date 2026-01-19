import React, { useEffect } from 'react'
import Loader from '../Loader'
import ProjectNavigation from './ProjectNavigation' // Import the navigation component
import ProjectCTA from './ProjectCTA' // Import the CTA component
import './index.scss'

const BlogArticles = () => {
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
            Blog Articles
          </h1>
          <p>
            Expert grooming advice articles targeting specific needs of Bevel's
            audience.
          </p>
        </div>

        <div className='project-content'>
          <h2>My Writing Process</h2>
          <p>
            When writing for Bevel, SEO is the foundation but not the final
            word. I start with keyword research and search intent, then shape
            each blog around what the reader actually wants to know. From there,
            I apply Bevel's tone: approachable, confident, and rooted in
            culture. The result is content that is optimized to perform while
            still feeling human, helpful, and unmistakably on-brand.
          </p>

          <h2>Published Articles</h2>
          <div className='article-links'>
            <a
              href='https://getbevel.com/blogs/articles/faces-of-atlanta-vol-4'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>Faces of Atlanta Vol. 4</span>
              <span className='article-desc'>
                Holiday campaign celebrating Atlanta families and their grooming
                traditions
              </span>
            </a>
            <a
              href='https://getbevel.com/blogs/articles/a-bevel-holiday'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>A Bevel Holiday</span>
              <span className='article-desc'>
                Heartwarming story of a grandson gifting his grandfather the
                perfect grooming kit
              </span>
            </a>
            <a
              href='https://getbevel.com/blogs/articles/bevel-teams-up-with-big3-and-nancy-lieberman-charities-to-bring-a-dream-court%E2%84%A2-to-santa-monica'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>
                Bevel Teams Up with BIG3 and Nancy Lieberman Charities
              </span>
              <span className='article-desc'>
                Partnership announcement for bringing a Dream Court™ to Santa
                Monica
              </span>
            </a>
            <a
              href='https://getbevel.com/blogs/articles/celebrating-fathers-and-the-wisdom-they-pass-down'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>
                Celebrating Fathers and the Wisdom They Pass Down
              </span>
              <span className='article-desc'>
                Father's Day feature exploring how fathers impart valuable
                lessons
              </span>
            </a>
            <a
              href='https://getbevel.com/blogs/articles/military'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>Serving Those Who Serve</span>
              <span className='article-desc'>
                Announcement of Bevel's military discount program
              </span>
            </a>
            <a
              href='https://getbevel.com/blogs/articles/teams-up-with-ufc-heavyweight-curtis-razor-blaydes'
              target='_blank'
              rel='noopener noreferrer'
              className='article-card'
            >
              <span className='article-title'>
                Bevel Teams Up with UFC Heavyweight Curtis "Razor" Blaydes
              </span>
              <span className='article-desc'>
                Partnership announcement with UFC heavyweight contender
              </span>
            </a>
          </div>

          {/* Add the CTA component before navigation */}
          <ProjectCTA />

          {/* Add the ProjectNavigation component */}
          <ProjectNavigation currentProject='/projects/blog' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default BlogArticles
