const { test, expect } = require('./fixtures')

// Links in page content, excluding the sidebar navigation (which repeats
// labels such as "Contact Me").
const contentLink = (page, name) =>
  page.getByRole('link', { name }).and(page.locator('a:not(nav a)'))

test.describe('homepage calls to action', () => {
  test('"View My Work" opens the projects page', async ({ page }) => {
    await page.goto('/')
    await contentLink(page, /view my work/i).click()

    await expect(page).toHaveURL(/#\/projects$/)
    await expect(page.getByRole('heading', { level: 1, name: /projects/i })).toBeVisible()
  })

  test('"Contact Me" opens the contact page', async ({ page }) => {
    await page.goto('/')
    await contentLink(page, /contact me/i).click()

    await expect(page).toHaveURL(/#\/contact$/)
    await expect(page.getByRole('heading', { level: 1, name: /contact/i })).toBeVisible()
  })
})

const PROJECT_PAGES = [
  { card: /email campaigns/i, path: '/projects/email' },
  { card: /sms strategies/i, path: '/projects/sms' },
  { card: /blog articles/i, path: '/projects/blog' },
  { card: /e-commerce/i, path: '/projects/ecom' },
]

test.describe('project pages', () => {
  for (const { card, path } of PROJECT_PAGES) {
    test(`${path} loads from the projects overview`, async ({ page }) => {
      await page.goto('/#/projects')
      await contentLink(page, card).click()

      await expect(page).toHaveURL(new RegExp(`#${path}/?$`))
      const heading = page.getByRole('heading', { level: 1 })
      await expect(heading).toBeVisible()
      await expect(heading).not.toHaveText('')
    })
  }
})

test.describe('blog', () => {
  test('listing renders posts and a post opens', async ({ page }) => {
    await page.goto('/#/blog')
    await expect(page.getByRole('heading', { level: 1, name: /blog/i })).toBeVisible()

    const firstPost = page.locator('a[href^="#/blog/"]').first()
    await expect(firstPost).toBeVisible()
    const title = (await firstPost.getByRole('heading').first().textContent()).trim()
    expect(title).not.toBe('')

    await firstPost.click()

    await expect(page).toHaveURL(/#\/blog\/[^/]+$/)
    // .first(): post markdown may repeat the title as its own level-1 heading.
    await expect(page.getByRole('heading', { level: 1, name: title }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /back to blog/i })).toBeVisible()
  })
})
