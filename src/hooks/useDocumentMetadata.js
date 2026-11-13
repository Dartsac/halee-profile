import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  buildDocumentMetadata,
  getBlogPostMetadata,
  getPageMetadata,
} from './documentMetadata'

export const applyDocumentMetadata = (metadata) => {
  const { title, canonicalUrl, metaTags } = buildDocumentMetadata(metadata)
  const { head } = document

  document.title = title

  metaTags.forEach(([attribute, key, content]) => {
    let element = head.querySelector(`meta[${attribute}="${key}"]`)
    if (content === null) {
      if (element) element.remove()
      return
    }
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, key)
      head.appendChild(element)
    }
    element.setAttribute('content', content)
  })

  let canonicalLink = head.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', canonicalUrl)
}

// Sets static per-route metadata whenever the path changes. Blog posts get a
// generic blog fallback here until useBlogPostMetadata receives the post.
export const useRouteMetadata = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    applyDocumentMetadata(getPageMetadata(pathname))
  }, [pathname])
}

export const useBlogPostMetadata = (post) => {
  const { pathname } = useLocation()
  const title = post?.title
  const excerpt = post?.excerpt
  const featuredImage = post?.featuredImage

  useEffect(() => {
    if (!title) return
    applyDocumentMetadata(
      getBlogPostMetadata({ title, excerpt, featuredImage }, pathname),
    )
  }, [title, excerpt, featuredImage, pathname])
}
