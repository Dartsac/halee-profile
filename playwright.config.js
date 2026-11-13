// @ts-check
const { defineConfig, devices } = require('@playwright/test')

const PORT = Number(process.env.E2E_PORT || 4174)

// End-to-end smoke tests run against the production build (build/).
// `npm run test:e2e` builds first; CI builds in an earlier step and runs
// `npx playwright test` directly.
module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node e2e/serve-build.js',
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
