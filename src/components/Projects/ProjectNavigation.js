// ProjectNavigation.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectNavigation.scss'
// Import FontAwesome icons for consistent styling with your site
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ProjectNavigation = ({ currentProject }) => {
  const navigate = useNavigate()

  // Define all projects in order
  const projects = [
    { path: '/projects/email', title: 'Email Campaigns' },
    { path: '/projects/sms', title: 'SMS Strategies' },
    { path: '/projects/blog', title: 'Blog Articles' },
    { path: '/projects/ecom', title: 'E-Commerce Copy' },
  ]

  // Find current project index
  const currentIndex = projects.findIndex(
    (project) => project.path === currentProject,
  )

  // Calculate previous and next projects (with circular navigation)
  const prevProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1]

  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0]

  // Function to navigate and scroll to top
  const navigateToProject = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <div className='project-navigation'>
      <button
        className='nav-button prev-button'
        onClick={() => navigateToProject(prevProject.path)}
      >
        <div className='button-content'>
          <div className='arrow'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className='text-content'>
            <span className='label'>Previous Project</span>
            <span className='project-title'>{prevProject.title}</span>
          </div>
        </div>
      </button>

      <button
        className='nav-button next-button'
        onClick={() => navigateToProject(nextProject.path)}
      >
        <div className='button-content'>
          <div className='text-content'>
            <span className='label'>Next Project</span>
            <span className='project-title'>{nextProject.title}</span>
          </div>
          <div className='arrow'>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </button>
    </div>
  )
}

export default ProjectNavigation
