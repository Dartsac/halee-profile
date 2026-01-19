import Headshot from '../../assets/images/headshot1.webp'
import Resume from '../../assets/HaleeMcCray Resume.pdf'
import Loader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const About = () => {
  return (
    <>
      <div className='container about-page'>
        <div className='text-zone'>
          <h1>About Me</h1>
          <p>
            I'm a Copywriter who blends creative storytelling with data-driven
            SEO. My mission? To make your readers
            <strong> feel</strong> something while ensuring your brand gets
            found. Whether it's a burst of joy or a click-through to purchase, I
            aim to spark genuine emotion and measurable action.
          </p>
          <p>
            With a degree in psychology from Georgia State University, I
            understand that connecting with people starts with knowing what
            makes them tick. When you tap into what someone truly cares about,
            that's when they believe in your brand. From selling products to
            crafting an entertaining blog, the key is creating content that
            inspires thought and emotion.
          </p>
          <p>
            But I'm not just about tugging at heartstrings—I'm about results. I
            am Google Analytics certified and proficient in technical SEO tools
            like SemRush and Google Keyword Planner. I don't just guess what
            your audience wants; I research the keywords they use and the
            questions they ask. I craft content that ranks, resonates, and
            converts.
          </p>
          <p>
            Let's connect and see how I can help you craft content that speaks
            directly to your audience.
          </p>

          <a
            className='resume-button'
            href={Resume}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faFileArrowDown} /> Download Resume
          </a>
        </div>

        <div className='headshot-container'>
          <img className='headshot' src={Headshot} alt='headshot' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default About
