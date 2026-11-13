#!/usr/bin/env node

/**
 * Generates public/sitemap.xml from the static pages in
 * src/hooks/pageMetadata.json and the published blog posts.
 * Runs automatically before each build (see "prebuild" in package.json).
 */

const fs = require('fs')
const path = require('path')
const { getSiteRoutes } = require('./site-routes')
const { toCanonicalUrl } = require('../src/hooks/documentMetadata')

const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml')

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

try {
  const routes = getSiteRoutes()
  const urlEntries = routes.map(({ path: routePath, lastModified }) => {
    const lines = [`    <loc>${escapeXml(toCanonicalUrl(routePath))}</loc>`]
    if (lastModified) lines.push(`    <lastmod>${lastModified}</lastmod>`)
    return ['  <url>', ...lines, '  </url>'].join('\n')
  })

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    '</urlset>',
    '',
  ].join('\n')

  fs.writeFileSync(SITEMAP_FILE, sitemap)
  console.log(`✓ Generated sitemap with ${routes.length} URL(s)`)
} catch (error) {
  console.error('✗ Error generating sitemap:', error.message)
  process.exit(1)
}
