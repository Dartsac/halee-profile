// CommonJS so the browser hook and the Node build scripts (scripts/*.js)
// share one definition of titles, descriptions, and canonical URLs.
// Avoid syntax that Babel compiles into helper imports (object/array spread,
// array destructuring, classes, async): an injected `import` makes webpack
// treat this file as an ES module and the build fails.
const { siteUrl, siteName, defaultImage, pages } = require('./pageMetadata.json')

// '/about/' and '/about' are the same page; the root stays '/'.
const normalizePath = (path) => {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.length > 1
    ? withLeadingSlash.replace(/\/+$/, '')
    : withLeadingSlash
}

// Canonical URLs use a trailing slash because each route is published as
// <route>/index.html, which GitHub Pages serves at '<route>/'.
const toCanonicalUrl = (path) => {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/' ? `${siteUrl}/` : `${siteUrl}${normalizedPath}/`
}

const toAbsoluteUrl = (url) =>
  /^https?:\/\//.test(url) ? url : `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`

const getPageMetadata = (path) => {
  const normalizedPath = normalizePath(path)
  const page =
    pages[normalizedPath] ||
    (normalizedPath.startsWith('/blog/') ? pages['/blog'] : pages['/'])
  return Object.assign({}, page, { path: normalizedPath })
}

const getBlogPostMetadata = (post, path) => ({
  title: `${post.title} | ${siteName}`,
  description: post.excerpt || pages['/blog'].description,
  path,
  image: post.featuredImage || null,
  imageAlt: post.title,
  type: 'article',
})

// Returns the <title>, canonical URL, and [attribute, key, content] meta tags
// for a page. A null content means the tag must be removed.
const buildDocumentMetadata = ({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
}) => {
  const canonicalUrl = toCanonicalUrl(path)
  const usesDefaultImage = !image
  const imageUrl = toAbsoluteUrl(image || defaultImage.path)
  const imageAltText = usesDefaultImage ? defaultImage.alt : imageAlt || title

  return {
    title,
    canonicalUrl,
    metaTags: [
      ['name', 'description', description],
      ['property', 'og:site_name', siteName],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:type', type],
      ['property', 'og:url', canonicalUrl],
      ['property', 'og:image', imageUrl],
      ['property', 'og:image:type', usesDefaultImage ? defaultImage.type : null],
      ['property', 'og:image:width', usesDefaultImage ? defaultImage.width : null],
      ['property', 'og:image:height', usesDefaultImage ? defaultImage.height : null],
      ['property', 'og:image:alt', imageAltText],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', imageUrl],
      ['name', 'twitter:image:alt', imageAltText],
    ],
  }
}

module.exports = {
  siteUrl,
  pages,
  normalizePath,
  toCanonicalUrl,
  getPageMetadata,
  getBlogPostMetadata,
  buildDocumentMetadata,
}
