import { useEffect, useRef, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import './index.scss'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const refForm = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_jzo574n',
        'template_unv8nbx', //template id from account
        refForm.current,
        'Wu_Hrbe-Nw0XGxvGL', //user token
      )
      .then(
        () => {
          Swal.fire("I've got mail! :)", "I'll be in touch soon", 'success')
        },
        () => {
          Swal.fire('Oops...', 'Failed to send message. Try again.', 'error')
        },
      )
  }

  return (
    <>
      <div className='container contact-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in full-time job opportunities - especially
            ambitious or large projects. However, if you have other requests or
            questions, don’t hesitate to contact me using the form below!
          </p>
          <div className='contact-form'>
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className='half'>
                  <input
                    type={'text'}
                    name='name'
                    placeholder='Name'
                    required
                  />
                </li>
                <li className='half'>
                  <input
                    type={'email'}
                    name='email'
                    placeholder='Email'
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder='Subject'
                    type='text'
                    name='subject'
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder='Message'
                    name='message'
                    required
                  ></textarea>
                </li>
                <li>
                  <input
                    type={'submit'}
                    className='flat-button'
                    value={'SEND'}
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <Loader />
    </>
  )
}

export default Contact
