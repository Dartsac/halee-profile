import { getNormalizedAppUrl } from './redirectLegacyHashUrl'

const urlParts = (url) => {
  const { pathname, search, hash } = new URL(url)
  return { pathname, search, hash }
}

test('rewrites old HashRouter links to path-based URLs', () => {
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/#/projects/email')))
    .toBe('/projects/email')
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/#/blog/getting-started?ref=x')))
    .toBe('/blog/getting-started?ref=x')
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/#/'))).toBe('/')
})

test('removes the trailing slash added by GitHub Pages directory redirects', () => {
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/about/'))).toBe('/about')
})

test('leaves normalized URLs and non-route hashes such as Netlify Identity tokens alone', () => {
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/'))).toBeNull()
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/projects/email'))).toBeNull()
  expect(getNormalizedAppUrl(urlParts('https://haleemccray.com/#invite_token=abc'))).toBeNull()
})
