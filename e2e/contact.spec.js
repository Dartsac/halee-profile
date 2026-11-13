const { test, expect } = require('./fixtures')

// A field counts as flagged if the browser's constraint validation rejects it
// or the app marks it aria-invalid (covers native and custom validation UIs).
const expectFlagged = (field) =>
  expect
    .poll(() =>
      field.evaluate(
        (el) => !el.validity.valid || el.getAttribute('aria-invalid') === 'true',
      ),
    )
    .toBe(true)

const formFields = (page) => ({
  name: page.getByRole('textbox', { name: /name/i }),
  email: page.getByRole('textbox', { name: /email/i }),
  subject: page.getByRole('textbox', { name: /subject/i }),
  message: page.getByRole('textbox', { name: /message/i }),
  submit: page.getByRole('button', { name: /send/i }),
})

test.describe('contact form', () => {
  test('flags an empty submission without sending', async ({ page, emailjsRequests }) => {
    await page.goto('/contact')
    const form = formFields(page)

    await form.submit.click()

    await expectFlagged(form.name)
    await expectFlagged(form.message)
    await expect(page).toHaveURL(/\/contact\/?$/)
    expect(emailjsRequests).toHaveLength(0)
  })

  test('flags an invalid email address without sending', async ({ page, emailjsRequests }) => {
    await page.goto('/contact')
    const form = formFields(page)

    await form.name.fill('Test Visitor')
    await form.email.fill('not-an-email')
    await form.subject.fill('Smoke test')
    await form.message.fill('This message must not be sent.')
    await form.submit.click()

    await expectFlagged(form.email)
    await expect(page).toHaveURL(/\/contact\/?$/)
    expect(emailjsRequests).toHaveLength(0)
  })

  test('a valid submission goes only to the mocked EmailJS endpoint', async ({
    page,
    emailjsRequests,
  }) => {
    await page.goto('/contact')
    const form = formFields(page)

    await form.name.fill('Test Visitor')
    await form.email.fill('visitor@example.com')
    await form.subject.fill('Smoke test')
    await form.message.fill('Mocked submission from the e2e suite.')
    await form.submit.click()

    await expect.poll(() => emailjsRequests.length).toBe(1)
    expect(emailjsRequests[0].postData()).toContain('Mocked submission from the e2e suite.')
  })
})
