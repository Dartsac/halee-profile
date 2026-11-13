import { fireEvent, render, screen } from '@testing-library/react'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from '.'

const renderLayout = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Link to='/about'>Go to about</Link>} />
          <Route path='about' element={<h1>About page</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

beforeAll(() => {
  window.scrollTo = jest.fn()
  window.innerWidth = 1280
})

test('skip link is the first focusable element and focuses main content', () => {
  renderLayout()
  const skipLink = screen.getByRole('link', { name: 'Skip to main content' })

  const firstFocusable = document.querySelector('a[href], button')
  expect(firstFocusable).toBe(skipLink)

  fireEvent.click(skipLink)
  expect(screen.getByRole('main')).toHaveFocus()
})

test('page content is rendered inside the main landmark', () => {
  renderLayout()

  expect(screen.getByRole('main')).toContainElement(
    screen.getByRole('link', { name: 'Go to about' }),
  )
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
})

test('focus moves to main content after client-side navigation', () => {
  renderLayout()

  fireEvent.click(screen.getByRole('link', { name: 'Go to about' }))

  expect(screen.getByRole('heading', { name: 'About page' })).toBeInTheDocument()
  expect(screen.getByRole('main')).toHaveFocus()
})
