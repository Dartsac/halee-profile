#!/usr/bin/env node

/**
 * Writes build/<route>/index.html for every route in the sitemap, each a copy
 * of build/index.html with that page's title, description, canonical URL, and
 * Open Graph/Twitter tags. Link-preview crawlers do not run JavaScript, and
 * GitHub Pages can then serve deep links with a 200 status. build/404.html is
 * a copy of the homepage shell so any other path still loads the React app.
 * Runs automatically after each build (see "postbuild" in package.json).
 */

const fs = require('fs')
const path = require('path')
const { getSiteRoutes } = require('./site-routes')
const { buildDocumentMetadata } = require('../src/hooks/documentMetadata')

const BUILD_DIR = path.join(__dirname, '../build')
const INDEX_FILE = path.join(BUILD_DIR, 'index.html')

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const replaceRequired = (html, pattern, replacement, description) => {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${description} in build/index.html`)
  }
  return html.replace(pattern, replacement)
}

const applyMetadataToHtml = (templateHtml, metadata) => {
  const { title, canonicalUrl, metaTags } = buildDocumentMetadata(metadata)

  let html = replaceRequired(
    templateHtml,
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
    '<title>',
  )
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}"/>`,
    'canonical link',
  )

  metaTags.forEach(([attribute, key, content]) => {
    const pattern = new RegExp(
      `<meta ${attribute}="${escapeRegExp(key)}" content="[^"]*"\\s*/?>`,
    )
    html =
      content === null
        ? html.replace(pattern, '')
        : replaceRequired(
            html,
            pattern,
            `<meta ${attribute}="${key}" content="${escapeHtml(content)}"/>`,
            `<meta ${attribute}="${key}">`,
          )
  })

  return html
}

try {
  const templateHtml = fs.readFileSync(INDEX_FILE, 'utf8')
  const routes = getSiteRoutes()

  routes.forEach(({ path: routePath, metadata }) => {
    const outputFile =
      routePath === '/'
        ? INDEX_FILE
        : path.join(BUILD_DIR, routePath, 'index.html')
    fs.mkdirSync(path.dirname(outputFile), { recursive: true })
    fs.writeFileSync(outputFile, applyMetadataToHtml(templateHtml, metadata))
  })

  fs.copyFileSync(INDEX_FILE, path.join(BUILD_DIR, '404.html'))

  console.log(`✓ Generated ${routes.length} static page(s) and 404.html`)
} catch (error) {
  console.error('✗ Error generating static pages:', error.message)
  process.exit(1)
}
