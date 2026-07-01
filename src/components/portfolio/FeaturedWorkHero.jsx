import { useEffect, useRef, useState } from 'react'

export default function FeaturedWorkHero({ work, onPlay, onViewFrames }) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [videoEnabled, setVideoEnabled] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return undefined

    const mobile = window.matchMedia('(max-width: 760px)').matches
    const saveData = navigator.connection?.saveData
    if (mobile || saveData) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoEnabled(true)
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '320px 0px', threshold: 0.01 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!videoEnabled) return
    videoRef.current?.load()
    videoRef.current?.play().catch(() => {})
  }, [videoEnabled])

  return (
    <div className="featured-work" ref={rootRef}>
      <video
        ref={videoRef}
        className="featured-work-video"
        muted
        loop
        playsInline
        preload="none"
        poster={work.poster}
        aria-hidden="true"
      >
        {videoEnabled && <source src={work.video} type="video/mp4" />}
      </video>
      <div className="featured-work-overlay" />
      <div className="featured-work-content">
        <span className="featured-work-eyebrow">{work.eyebrow}</span>
        <h2>{work.title}</h2>
        <p className="featured-work-subtitle">{work.subtitle}</p>
        <p className="featured-work-description">{work.description}</p>
        <div className="featured-work-tags">
          {work.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <div className="featured-work-actions">
          <button type="button" className="featured-play" onClick={onPlay}>
            <i aria-hidden="true">▶</i> 播放完整视频
          </button>
          <button type="button" className="featured-process" onClick={onViewFrames}>
            查看关键画面 <b>↓</b>
          </button>
        </div>
      </div>
    </div>
  )
}
