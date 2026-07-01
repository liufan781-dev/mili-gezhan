import { useEffect } from 'react'

export default function ImageModal({ frame, onClose }) {
  useEffect(() => {
    if (!frame) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [frame, onClose])

  if (!frame) return null

  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={`${frame.title}大图`} onMouseDown={onClose}>
      <div className="frame-dialog" onMouseDown={event => event.stopPropagation()}>
        <button className="portfolio-modal-close" type="button" onClick={onClose} aria-label="关闭大图">×</button>
        <img src={frame.image} alt={frame.title} width="1600" height="900" decoding="async" />
        <strong>{frame.title}</strong>
      </div>
    </div>
  )
}
