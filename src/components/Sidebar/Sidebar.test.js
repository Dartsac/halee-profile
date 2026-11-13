import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '.'

const renderMobileSidebar = (onMenuStateChange = jest.fn()) => {
  window.innerWidth = 375
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Sidebar onMenuStateChange={onMenuStateChange} />
    </MemoryRouter>,
  )
  return {
    menuButton: screen.getByRole('button', { name: 'Menu' }),
    onMenuStateChange,
  }
}

beforeAll(() => {
  window.scrollTo = jest.fn()
})

afterEach(() => {
  window.innerWidth = 1024
  document.body.classList.remove('menu-open')
})

test('menu button exposes its expanded state and the menu it controls', () => {
  const { menuButton } = renderMobileSidebar()

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  expect(menuButton).toHaveAttribute('aria-controls', 'site-navigation')
  expect(document.getElementById('site-navigation')).toHaveAttribute('inert')

  fireEvent.click(menuButton)

  expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  expect(document.getElementById('site-navigation')).not.toHaveAttribute('inert')
  expect(document.body).toHaveClass('menu-open')
})

test('opening the menu moves focus to the first navigation link', () => {
  const { menuButton } = renderMobileSidebar()

  fireEvent.click(menuButton)

  expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus()
})

test('Escape closes the menu and returns focus to the menu button', () => {
  const { menuButton, onMenuStateChange } = renderMobileSidebar()
  fireEvent.click(menuButton)

  fireEvent.keyDown(document, { key: 'Escape' })

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  expect(menuButton).toHaveFocus()
  expect(document.body).not.toHaveClass('menu-open')
  expect(onMenuStateChange).toHaveBeenLastCalledWith(false)
})

test('Tab and Shift+Tab stay inside the open menu', () => {
  const { menuButton } = renderMobileSidebar()
  fireEvent.click(menuButton)
  const linkedIn = screen.getByRole('link', { name: /linkedin profile/i })

  linkedIn.focus()
  fireEvent.keyDown(document, { key: 'Tab' })
  expect(menuButton).toHaveFocus()

  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
  expect(linkedIn).toHaveFocus()
})

test('choosing a navigation link closes the menu', () => {
  const { menuButton } = renderMobileSidebar()
  fireEvent.click(menuButton)

  fireEvent.click(screen.getByRole('link', { name: 'About Me' }))

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  expect(document.body).not.toHaveClass('menu-open')
})

test('desktop sidebar has no menu button and keeps navigation reachable', () => {
  window.innerWidth = 1280
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Sidebar />
    </MemoryRouter>,
  )

  expect(screen.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
  expect(document.getElementById('site-navigation')).not.toHaveAttribute('inert')
})
