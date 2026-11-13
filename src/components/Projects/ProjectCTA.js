// src/components/Projects/ProjectCTA.js
// This component creates a consistent call-to-action across all project pages
import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCTA.scss'

const ProjectCTA = () => {
  return (
    <div className='project-cta'>
      <div className='cta-content'>
        <h3>Need copy for your brand?</h3>
        <p>
          Tell me about your audience and your goals, and I'll write copy built
          to reach them.
        </p>
        <Link
          to='/contact'
          className='cta-button'
          onClick={() => window.scrollTo(0, 0)}
        >
          Let's talk
        </Link>
      </div>
    </div>
  )
}

export default ProjectCTA
