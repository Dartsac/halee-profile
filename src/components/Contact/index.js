import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import './index.scss'

const EMAILJS_SERVICE_ID = 'service_jzo574n'
const EMAILJS_TEMPLATE_ID = 'template_unv8nbx'
const EMAILJS_PUBLIC_KEY = '1XR6UC8fBM2M1mM7n'

const LINKEDIN_URL = 'https://www.linkedin.com/in/halee-mccray-7040892a1/'
// TODO(owner): add Halee's public contact email (e.g. 'name@example.com') to
// show a direct mailto fallback. No address exists in the repo, so the
// email link stays hidden until this is set.
const DIRECT_EMAIL = ''

const FIELDS = ['name', 'email', 'subject', 'message']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_VALUES = { name: '', email: '', subject: '', message: '' }

const validateField = (field, value) => {
  const trimmed = value.trim()
  switch (field) {
    case 'name':
      return trimmed ? '' : 'Please enter your name.'
    case 'email':
      if (!trimmed) return 'Please enter your email address.'
      return EMAIL_PATTERN.test(trimmed)
        ? ''
        : 'Please enter a valid email address, like name@example.com.'
    case 'subject':
      return trimmed ? '' : 'Please add a subject.'
    case 'message':
      return trimmed ? '' : 'Please write a message.'
    default:
      return ''
  }
}

const validateAll = (values) =>
  FIELDS.reduce((errors, field) => {
    const error = validateField(field, values[field])
    return error ? { ...errors, [field]: error } : errors
  }, {})

const ContactFallback = () => (
  <>
    {DIRECT_EMAIL && (
      <>
        email me at <a href={`mailto:${DIRECT_EMAIL}`}>{DIRECT_EMAIL}</a> or{' '}
      </>
    )}
    message me on{' '}
    <a href={LINKEDIN_URL} target='_blank' rel='noopener noreferrer'>
      LinkedIn
    </a>
  </>
)

const Contact = () => {
  const navigate = useNavigate()
  const fieldRefs = useRef({})
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'error'

  const isSending = status === 'sending'

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear an existing error as soon as the user fixes the field.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    // Only flag fields the user has actually typed into, so tabbing through
    // an untouched form doesn't fill it with errors.
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (isSending) return

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    const firstInvalid = FIELDS.find((field) => nextErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
    } catch (error) {
      // Keep everything the user typed so they can retry or copy it elsewhere.
      setStatus('error')
      return
    }

    setStatus('idle')
    setValues(EMPTY_VALUES)
    const result = await Swal.fire({
      title: "I've got mail! :)",
      text: "I'll be in touch soon",
      icon: 'success',
      confirmButtonText: 'OK',
    })
    if (result.isConfirmed) {
      navigate('/')
    }
  }

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    ref: (el) => {
      fieldRefs.current[field] = el
    },
    'aria-invalid': errors[field] ? 'true' : 'false',
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  })

  const fieldError = (field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className='field-error'>
        {errors[field]}
      </p>
    ) : null

  return (
    <>
      <div className='container contact-page'>
        <div className='text-zone'>
          <h1>Contact Me</h1>
          <p>
            I am interested in full-time job opportunities - especially
            ambitious or large projects. However, if you have other requests or
            questions, don’t hesitate to contact me using the form below!
          </p>
          <div className='contact-form'>
            <form onSubmit={sendEmail} noValidate aria-busy={isSending}>
              <ul>
                <li className='half'>
                  <label htmlFor='contact-name'>Name</label>
                  <input
                    {...fieldProps('name')}
                    type='text'
                    autoComplete='name'
                    required
                  />
                  {fieldError('name')}
                </li>
                <li className='half'>
                  <label htmlFor='contact-email'>Email</label>
                  <input
                    {...fieldProps('email')}
                    type='email'
                    inputMode='email'
                    autoComplete='email'
                    autoCapitalize='off'
                    spellCheck='false'
                    required
                  />
                  {fieldError('email')}
                </li>
                <li>
                  <label htmlFor='contact-subject'>Subject</label>
                  <input {...fieldProps('subject')} type='text' required />
                  {fieldError('subject')}
                </li>
                <li>
                  <label htmlFor='contact-message'>Message</label>
                  <textarea {...fieldProps('message')} required></textarea>
                  {fieldError('message')}
                </li>
                {status === 'error' && (
                  <li>
                    <div className='form-alert' role='alert'>
                      Sorry, your message didn’t send. Your text is still here,
                      so you can try again—or <ContactFallback />.
                    </div>
                  </li>
                )}
                <li className='form-actions'>
                  <button
                    type='submit'
                    className='flat-button'
                    disabled={isSending}
                  >
                    {isSending ? 'SENDING…' : 'SEND'}
                  </button>
                </li>
              </ul>
            </form>
            <p className='contact-fallback'>
              Prefer not to use the form? You can also <ContactFallback />.
            </p>
          </div>
        </div>
      </div>
      <Loader />
    </>
  )
}

export default Contact
