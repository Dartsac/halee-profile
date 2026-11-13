import { fireEvent, render, screen, within } from '@testing-library/react'
import Carousel from '.'
import emailSamples from './emailSamples'

const centerSample = emailSamples[2]

// Keyboard activation: the opener has focus when the dialog opens.
const openCenterEmail = () => {
  const opener = screen.getByRole('button', { name: /enlarge email 3 of 5/i })
  opener.focus()
  fireEvent.click(opener)
  return screen.getByRole('dialog', { name: centerSample.title })
}

test('carousel controls have accessible names and announce the centered email', () => {
  render(<Carousel />)

  expect(screen.getByRole('button', { name: 'Previous email' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Next email' })).toBeInTheDocument()
  expect(screen.getByText(`Email 3 of 5: ${centerSample.title}`)).toBeInTheDocument()

  // Only the centered email is exposed and reachable by keyboard.
  const enlargeButtons = screen.getAllByRole('button', { name: /^enlarge email/i })
  expect(enlargeButtons).toHaveLength(1)
  expect(enlargeButtons[0]).toHaveAttribute('tabindex', '0')

  fireEvent.click(screen.getByRole('button', { name: 'Next email' }))
  expect(screen.getByText(`Email 4 of 5: ${emailSamples[3].title}`)).toBeInTheDocument()
})

test('clicking the centered email opens a labelled dialog with the image and text version', () => {
  render(<Carousel />)
  const dialog = openCenterEmail()

  expect(dialog).toHaveAttribute('aria-modal', 'true')
  expect(within(dialog).getByRole('img', { name: centerSample.alt })).toBeInTheDocument()
  expect(within(dialog).getByText('Read the email text')).toBeInTheDocument()
  expect(within(dialog).getByText(/As temps drop, don’t let your skincare/)).toBeInTheDocument()
  expect(document.body).toHaveClass('lightbox-open')
})

test('dialog moves focus inside, traps Tab, and closes on Escape returning focus', () => {
  render(<Carousel />)
  const opener = screen.getByRole('button', { name: /enlarge email 3 of 5/i })
  const dialog = openCenterEmail()

  const closeButton = within(dialog).getByRole('button', { name: 'Close' })
  expect(closeButton).toHaveFocus()

  // Shift+Tab from the first focusable element wraps to the last one.
  fireEvent.keyDown(closeButton, { key: 'Tab', shiftKey: true })
  const summary = within(dialog).getByText('Read the email text')
  expect(summary).toHaveFocus()
  // Tab from the last focusable element wraps back to the first.
  fireEvent.keyDown(summary, { key: 'Tab' })
  expect(closeButton).toHaveFocus()

  fireEvent.keyDown(document.activeElement, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(opener).toHaveFocus()
  expect(document.body).not.toHaveClass('lightbox-open')
})

test('dialog closes from the close button and from a backdrop click', () => {
  render(<Carousel />)

  let dialog = openCenterEmail()
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  dialog = openCenterEmail()
  fireEvent.click(dialog.parentElement)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('every email sample has a title, alt text, and a transcript', () => {
  emailSamples.forEach((sample) => {
    expect(sample.title).toBeTruthy()
    expect(sample.alt).toBeTruthy()
    expect(sample.transcript.length).toBeGreaterThan(0)
  })
})
