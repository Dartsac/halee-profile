import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import './index.scss'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'

// Modal image viewer: focus moves to the close button on open, Tab cycles
// within the dialog, Escape or a backdrop click closes it, and focus returns
// to the element that opened it.
const Lightbox = ({ title, image, onClose, children }) => {
  const titleId = useId()
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    document.body.classList.add('lightbox-open')
    closeButtonRef.current.focus()

    return () => {
      document.body.classList.remove('lightbox-open')
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = Array.from(
      dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR),
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey && (active === first || !focusable.includes(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (active === last || !focusable.includes(active))) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div
      className='lightbox-backdrop'
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className='lightbox-dialog'
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
      >
        <div className='lightbox-header'>
          <h2 id={titleId} className='lightbox-title'>
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type='button'
            className='lightbox-close'
            onClick={onClose}
            aria-label='Close'
          >
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div
          className='lightbox-body'
          tabIndex={0}
          role='region'
          aria-label={`${title} (scrollable)`}
        >
          <img className='lightbox-image' src={image.src} alt={image.alt} />
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default Lightbox
