import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import Contact from '.'

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: { send: jest.fn() },
}))
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}))
jest.mock('../Loader', () => () => null)

const renderContact = () =>
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <Routes>
        <Route path='/contact' element={<Contact />} />
        <Route path='/' element={<p>Home page</p>} />
      </Routes>
    </MemoryRouter>,
  )

const fillForm = (overrides = {}) => {
  const values = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'Project inquiry',
    message: 'Hello Halee!',
    ...overrides,
  }
  for (const [label, value] of [
    [/name/i, values.name],
    [/email/i, values.email],
    [/subject/i, values.subject],
    [/message/i, values.message],
  ]) {
    if (value) fireEvent.change(screen.getByLabelText(label), { target: { value } })
  }
}

const sendButton = () => screen.getByRole('button', { name: /send/i })

beforeEach(() => {
  jest.clearAllMocks()
})

test('shows inline errors, focuses the first invalid field, and does not send', async () => {
  renderContact()

  fireEvent.click(sendButton())

  expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
  expect(screen.getByText('Please enter your email address.')).toBeInTheDocument()
  expect(screen.getByText('Please add a subject.')).toBeInTheDocument()
  expect(screen.getByText('Please write a message.')).toBeInTheDocument()
  expect(screen.getByLabelText(/name/i)).toHaveFocus()
  expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByLabelText(/name/i)).toHaveAccessibleDescription(
    'Please enter your name.',
  )
  expect(emailjs.send).not.toHaveBeenCalled()
})

test('rejects a malformed email and clears the error once fixed', async () => {
  renderContact()
  fillForm({ email: 'not-an-email' })

  fireEvent.click(sendButton())

  expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toHaveFocus()
  expect(emailjs.send).not.toHaveBeenCalled()

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'ada@example.com' },
  })

  expect(screen.queryByText(/enter a valid email address/i)).not.toBeInTheDocument()
})

test('disables the button while sending, then confirms and returns home', async () => {
  let resolveSend
  emailjs.send.mockReturnValue(
    new Promise((resolve) => {
      resolveSend = resolve
    }),
  )
  Swal.fire.mockResolvedValue({ isConfirmed: true })
  renderContact()
  fillForm()

  fireEvent.click(sendButton())

  expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
  expect(emailjs.send).toHaveBeenCalledTimes(1)
  expect(emailjs.send).toHaveBeenCalledWith(
    'service_jzo574n',
    'template_unv8nbx',
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'Project inquiry',
      message: 'Hello Halee!',
    },
    { publicKey: '1XR6UC8fBM2M1mM7n' },
  )

  resolveSend({ status: 200 })

  expect(await screen.findByText('Home page')).toBeInTheDocument()
  expect(Swal.fire).toHaveBeenCalledWith(
    expect.objectContaining({ icon: 'success' }),
  )
})

test('keeps the user input and offers a fallback when sending fails', async () => {
  emailjs.send.mockRejectedValueOnce(new Error('network down'))
  renderContact()
  fillForm()

  fireEvent.click(sendButton())

  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent(/didn’t send/i)
  expect(alert.querySelector('a[href*="linkedin.com"]')).not.toBeNull()
  expect(screen.getByLabelText(/name/i)).toHaveValue('Ada Lovelace')
  expect(screen.getByLabelText(/message/i)).toHaveValue('Hello Halee!')
  expect(sendButton()).toBeEnabled()
  expect(Swal.fire).not.toHaveBeenCalled()

  emailjs.send.mockResolvedValueOnce({ status: 200 })
  Swal.fire.mockResolvedValue({ isConfirmed: false })
  fireEvent.click(sendButton())

  await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(2))
  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
})

test('always shows email and LinkedIn fallbacks outside the form', () => {
  renderContact()

  expect(screen.getByText(/prefer not to use the form/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/halee-mccray-7040892a1/',
  )
  expect(screen.getByRole('link', { name: 'haleemccray41@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:haleemccray41@gmail.com',
  )
})
