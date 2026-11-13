import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useBlogPostMetadata, useRouteMetadata } from './useDocumentMetadata'

const metaContent = (selector) =>
  document.head.querySelector(selector)?.getAttribute('content')

const RouteMetadata = ({ post }) => {
  useRouteMetadata()
  useBlogPostMetadata(post)
  return null
}

const renderAt = (path, post = null) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <RouteMetadata post={post} />
    </MemoryRouter>,
  )

afterEach(() => {
  document.head.innerHTML = ''
  document.title = ''
})

test('sets the title, description, canonical URL, and share tags for a static route', () => {
  renderAt('/projects/email')

  expect(document.title).toBe('Bevel Email Campaigns | Halee McCray')
  expect(metaContent('meta[name="description"]')).toMatch(/seasonal email campaigns for Bevel/)
  expect(document.head.querySelector('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://haleemccray.com/projects/email/')
  expect(metaContent('meta[property="og:url"]')).toBe('https://haleemccray.com/projects/email/')
  expect(metaContent('meta[property="og:image"]')).toBe('https://haleemccray.com/headshot-og.png')
  expect(metaContent('meta[property="og:image:width"]')).toBe('1200')
  expect(metaContent('meta[name="twitter:card"]')).toBe('summary_large_image')
})

test('uses blog post frontmatter once the post has loaded', () => {
  renderAt('/blog/getting-started', {
    title: 'Welcome to My Blog!',
    excerpt: 'Thoughts on books and movies.',
    featuredImage: '/images/blog/cover.jpg',
  })

  expect(document.title).toBe('Welcome to My Blog! | Halee McCray')
  expect(metaContent('meta[name="description"]')).toBe('Thoughts on books and movies.')
  expect(metaContent('meta[property="og:type"]')).toBe('article')
  expect(metaContent('meta[property="og:image"]'))
    .toBe('https://haleemccray.com/images/blog/cover.jpg')
  expect(document.head.querySelector('meta[property="og:image:width"]')).toBeNull()
  expect(document.head.querySelector('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://haleemccray.com/blog/getting-started/')
})

test('falls back to blog metadata while a blog post is loading', () => {
  renderAt('/blog/getting-started')

  expect(document.title).toBe('Blog | Halee McCray')
})
