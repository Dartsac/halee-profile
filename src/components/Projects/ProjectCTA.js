// src/components/Projects/ProjectCTA.js
// This component creates a consistent call-to-action across all project pages
import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCTA.scss'

const ProjectCTA = () => {
  return (
    <div className='project-cta'>
      <div className='cta-content'>
        <h3>Ready to elevate your brand's voice?</h3>
        <p>
          Got a project in mind? I'd love to help you craft content that
          resonates with your audience and drives real results. Let's create
          something amazing together!
        </p>
        <Link to='/contact' className='cta-button'>
          Let's Talk!
        </Link>
      </div>
    </div>
  )
}

export default ProjectCTA
