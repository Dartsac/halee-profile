import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './components/Home'
import EmailCampaigns from './components/Projects/EmailCampaigns'

jest.mock('./components/Logo', () => () => null)
jest.mock('./components/Loader', () => () => null)
jest.mock('./components/Carousel', () => () => <div>Campaign gallery</div>)

const renderPage = (page) => render(<MemoryRouter>{page}</MemoryRouter>)

test('homepage immediately explains the services and links to work and contact', () => {
  renderPage(<Home />)

  expect(screen.getByRole('heading', { name: /copywriter & content strategist/i }))
    .toBeInTheDocument()
  expect(screen.getByText(/I write emails, SMS campaigns/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view my work/i }))
    .toHaveAttribute('href', '/projects')
  expect(screen.getByRole('link', { name: /contact me/i }))
    .toHaveAttribute('href', '/contact')
  expect(screen.getByRole('link', { name: /featured work/i }))
    .toHaveAttribute('href', '/projects/email')
})

test('email case study explains the brief, role, approach, and measurement limits', () => {
  const { unmount } = renderPage(<EmailCampaigns />)

  expect(screen.getByRole('heading', { name: /the brief/i })).toBeInTheDocument()
  expect(screen.getByText(/Copywriting: subject lines/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /selected email campaigns/i }))
    .toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /thinking behind the copy/i }))
    .toBeInTheDocument()
  expect(screen.getByText(/goals, not reported results/)).toBeInTheDocument()
  expect(document.body).toHaveClass('project-page-active')

  unmount()
  expect(document.body).not.toHaveClass('project-page-active')
})
