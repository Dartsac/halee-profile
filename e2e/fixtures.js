// Shared Playwright fixtures for the smoke tests.
// - Every request outside the local build server is blocked, so tests never
//   depend on (or send anything to) third-party services.
// - EmailJS API calls are fulfilled with a fake success and recorded in
//   `emailjsRequests`, so contact-form tests can assert whether a send was attempted.
// - Uncaught page errors fail the test.
const base = require('@playwright/test')

const EMAILJS_API = /^https:\/\/api\.emailjs\.com\//
const EMAILJS_CDN_SCRIPT = /^https:\/\/cdn\.jsdelivr\.net\/npm\/@emailjs\/browser/

const test = base.test.extend({
  emailjsRequests: async ({}, use) => {
    await use([])
  },

  page: async ({ page, baseURL, emailjsRequests }, use) => {
    const pageErrors = []
    page.on('pageerror', (error) => pageErrors.push(error))

    await page.route('**/*', (route) => {
      const url = route.request().url()

      if (url.startsWith(baseURL) || url.startsWith('data:')) {
        return route.continue()
      }
      if (EMAILJS_API.test(url)) {
        emailjsRequests.push(route.request())
        return route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' })
      }
      if (EMAILJS_CDN_SCRIPT.test(url)) {
        // public/index.html calls emailjs.init() from the CDN build.
        return route.fulfill({
          status: 200,
          contentType: 'text/javascript',
          body: 'window.emailjs = { init: function () {} };',
        })
      }
      return route.abort()
    })

    await use(page)

    base.expect(pageErrors, 'uncaught errors in the page').toEqual([])
  },
})

module.exports = { test, expect: base.expect }
