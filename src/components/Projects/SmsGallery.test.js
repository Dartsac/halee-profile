import { fireEvent, render, screen, within } from '@testing-library/react'
import SmsGallery from './SmsGallery'

test('SMS screenshot exposes its message text and opens an enlarged view', () => {
  render(<SmsGallery position='bottom-right' />)

  const opener = screen.getByRole('button', { name: /Black Friday is on!.*View larger/ })
  opener.focus()
  fireEvent.click(opener)

  const dialog = screen.getByRole('dialog', { name: 'Black Friday SMS' })
  expect(
    within(dialog).getByRole('img', { name: /30% off sitewide & FREE shipping/ }),
  ).toBeInTheDocument()

  fireEvent.keyDown(document.activeElement, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(opener).toHaveFocus()
})
