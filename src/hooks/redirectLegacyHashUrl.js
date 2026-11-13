// The site used HashRouter, so shared links look like
// https://haleemccray.com/#/projects/email. Rewrite those to the path-based
// URL before the router mounts. Other hashes (for example Netlify Identity's
// #invite_token=...) are left untouched. A trailing slash added by GitHub
// Pages' directory redirect is removed so pathname checks such as
// pathname === '/about' keep working.
const stripTrailingSlash = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

// Returns the URL to replace the current one with, or null if it is already
// normalized.
export const getNormalizedAppUrl = ({ pathname, search, hash }) => {
  if (hash.startsWith('#/')) {
    const legacyUrl = new URL(hash.slice(1), 'https://haleemccray.com')
    return `${stripTrailingSlash(legacyUrl.pathname)}${legacyUrl.search}${legacyUrl.hash}`
  }

  const normalizedPathname = stripTrailingSlash(pathname)
  return normalizedPathname === pathname
    ? null
    : `${normalizedPathname}${search}${hash}`
}

export const redirectLegacyHashUrl = () => {
  const normalizedUrl = getNormalizedAppUrl(window.location)
  if (normalizedUrl) {
    window.history.replaceState(window.history.state, '', normalizedUrl)
  }
}
