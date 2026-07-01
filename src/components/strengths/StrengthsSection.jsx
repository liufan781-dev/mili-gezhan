import { useEffect, useRef, useState } from 'react'
import strengthsData from '../../data/strengthsData'
import StrengthCard from './StrengthCard'
import TargetCursor from './TargetCursor'

export default function StrengthsSection() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [entered, setEntered] = useState(false)
  const activeStrength = strengthsData.find(item => item.id === activeId)
  const headlineKeyword = activeStrength?.headlineKeyword || '高效'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setEntered(true)
        observer.disconnect()
      },
      { threshold: 0.16 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="strengths section" id="strengths" ref={sectionRef}>
      <div className="shell">
        <div className={`section-title strengths-title ${entered ? 'is-entered' : ''}`}>
          <span>03 / MY STRENGTHS</span>
          <h2>
            让复杂工作变得<br />
            <em>清晰、稳定、<span key={headlineKeyword}>{headlineKeyword}</span>。</em>
          </h2>
        </div>
        <div className="strength-grid" onMouseLeave={() => setActiveId(null)}>
          {strengthsData.map((item, index) => (
            <StrengthCard
              item={item}
              active={activeId === item.id}
              muted={Boolean(activeId && activeId !== item.id)}
              entered={entered}
              index={index}
              onActivate={() => setActiveId(item.id)}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <TargetCursor sectionRef={sectionRef} activeId={activeId} />
    </section>
  )
}
