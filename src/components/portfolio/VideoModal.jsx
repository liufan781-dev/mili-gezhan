import { useEffect, useRef } from 'react'

export default function VideoModal({ open, video, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) videoRef.current?.pause()
  }, [open])

  if (!open) return null

  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label="播放完整视频" onMouseDown={onClose}>
      <div className="portfolio-video-dialog" onMouseDown={event => event.stopPropagation()}>
        <button className="portfolio-modal-close" type="button" onClick={onClose} aria-label="关闭视频">×</button>
        <video ref={videoRef} src={video} controls autoPlay playsInline preload="metadata" />
      </div>
    </div>
  )
}
