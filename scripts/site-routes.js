/**
 * Lists every public route with its page metadata. Shared by
 * generate-sitemap.js (prebuild) and generate-static-pages.js (postbuild).
 * Blog post routes come from the markdown frontmatter in public/content/blog,
 * using the same slug and published rules as src/utils/blogUtils.js.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const {
  pages,
  getBlogPostMetadata,
} = require('../src/hooks/documentMetadata')

const BLOG_DIR = path.join(__dirname, '../public/content/blog')

const toDateString = (date) => {
  const parsedDate = new Date(date)
  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate.toISOString().slice(0, 10)
}

const getBlogPostRoutes = () => {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8'))
      const slug = filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      return { slug, data }
    })
    .filter(({ data }) => data.published !== false)
    .map(({ slug, data }) => {
      const routePath = `/blog/${slug}`
      return {
        path: routePath,
        lastModified: toDateString(data.date),
        metadata: getBlogPostMetadata(
          {
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            featuredImage: data.featuredImage || null,
          },
          routePath,
        ),
      }
    })
}

const getSiteRoutes = () => [
  ...Object.entries(pages).map(([routePath, page]) => ({
    path: routePath,
    lastModified: null,
    metadata: { ...page, path: routePath },
  })),
  ...getBlogPostRoutes(),
]

module.exports = { getSiteRoutes }
