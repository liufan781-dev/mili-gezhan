import { useEffect, useRef, useState } from 'react'
import visualStudiesData from '../data/visualStudiesData'
import './VisualStudies.css'

const padNumber = value => String(value).padStart(2, '0')

export default function VisualStudies() {
  const [gallery, setGallery] = useState(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  const openGallery = study => {
    previousFocusRef.current = document.activeElement
    setGallery({ study, imageIndex: 0 })
  }

  const closeGallery = () => {
    setGallery(null)
    window.requestAnimationFrame(() => previousFocusRef.current?.focus())
  }

  const changeImage = direction => {
    setGallery(current => {
      if (!current) return current
      const count = current.study.galleryImages.length
      return {
        ...current,
        imageIndex: (current.imageIndex + direction + count) % count,
      }
    })
  }

  useEffect(() => {
    if (!gallery) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeGallery()
      if (event.key === 'ArrowLeft') changeImage(-1)
      if (event.key === 'ArrowRight') changeImage(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gallery?.study.id])

  return (
    <section className="visual-studies" id="visual-studies" aria-labelledby="visual-studies-title">
      <div className="visual-studies-shell">
        <header className="visual-studies-heading">
          <span>VISUAL ARCHIVE / 2026</span>
          <div>
            <h2 id="visual-studies-title">VISUAL STUDIES <em>视觉研究</em></h2>
            <p>从色彩、空间与材质三个方向进行的视觉探索。</p>
          </div>
        </header>

        <div className="visual-studies-list">
          {visualStudiesData.map(study => (
            <button
              className="visual-study-card"
              type="button"
              aria-label={`查看${study.titleZh}视觉研究画廊`}
              onClick={() => openGallery(study)}
              key={study.id}
            >
              <img
                className="visual-study-background"
                src={study.backgroundImage}
                alt=""
                width="1920"
                height="1080"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <span className="visual-study-shade" aria-hidden="true" />
              <span className="visual-study-index">{study.index} / 03</span>
              <span className="visual-study-focus">
                <img
                  src={study.focusImage}
                  alt={`${study.titleZh}重点视觉`}
                  width="1920"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="visual-study-titlebar">
                <span className="visual-study-title">
                  <strong>{study.titleEn}</strong>
                  <small>{study.titleZh}</small>
                </span>
                <span className="visual-study-view">
                  VIEW <small>/ 查看</small> <b aria-hidden="true">→</b>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {gallery && (
        <div
          className="visual-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={`${gallery.study.titleZh}图片画廊`}
          onMouseDown={event => event.target === event.currentTarget && closeGallery()}
        >
          <button
            className="visual-gallery-close"
            type="button"
            aria-label="关闭图片画廊"
            onClick={closeGallery}
            ref={closeButtonRef}
          >
            ×
          </button>
          <button
            className="visual-gallery-nav visual-gallery-prev"
            type="button"
            aria-label="查看上一张图片"
            onClick={() => changeImage(-1)}
          >
            ←
          </button>
          <figure className="visual-gallery-stage">
            <img
              className="visual-gallery-image"
              src={gallery.study.galleryImages[gallery.imageIndex]}
              alt={`${gallery.study.titleZh}视觉研究 ${gallery.imageIndex + 1}`}
              key={gallery.study.galleryImages[gallery.imageIndex]}
            />
            <figcaption>
              <strong>{gallery.study.titleEn}</strong>
              <span>
                {padNumber(gallery.imageIndex + 1)} / {padNumber(gallery.study.galleryImages.length)}
              </span>
            </figcaption>
          </figure>
          <button
            className="visual-gallery-nav visual-gallery-next"
            type="button"
            aria-label="查看下一张图片"
            onClick={() => changeImage(1)}
          >
            →
          </button>
        </div>
      )}
    </section>
  )
}
