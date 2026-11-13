import Headshot from '../../assets/images/headshot1.webp'
import Resume from '../../assets/Halee Dobson Resume.pdf'
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
            I'm a copywriter who pairs storytelling with SEO research. I want
            your readers to <strong>feel</strong> something, and I want search
            engines to find your brand. Sometimes that feeling is joy. Sometimes
            it's the nudge to click "buy."
          </p>
          <p>
            My psychology degree from Georgia State University taught me that
            connecting with people starts with knowing what they care about.
            People trust a brand that speaks to those cares. That holds whether
            I'm writing a product page or an entertaining blog post.
          </p>
          <p>
            I back the writing with research. I'm Google Analytics certified,
            and I use SEO tools like Semrush and Google Keyword Planner to find
            the keywords your audience searches and the questions they ask. Then
            I write content that ranks in search and persuades readers to act.
          </p>
          <p>
            If you need copy for your next project, get in touch.
          </p>

          <a
            className='resume-button'
            href={Resume}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faFileArrowDown} /> Download Resume
            <span className='visually-hidden'> (PDF, opens in a new tab)</span>
          </a>
        </div>

        <div className='headshot-container'>
          <img className='headshot' src={Headshot} alt='Portrait of Halee Dobson' />
        </div>
      </div>
      <Loader />
    </>
  )
}

export default About
