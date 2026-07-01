import { useEffect, useRef } from 'react'

export default function TargetCursor({ sectionRef, activeId }) {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const cursor = cursorRef.current
    const dot = dotRef.current
    const frame = frameRef.current
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1201px)')
    if (!section || !cursor || !dot || !frame || !enabled.matches) return undefined

    let pointerFrame = 0
    let frameAnimation = 0
    let pointer = { x: 0, y: 0 }

    const drawPointer = () => {
      dot.style.transform = `translate3d(${pointer.x - 3}px, ${pointer.y - 3}px, 0)`
      pointerFrame = 0
    }

    const handlePointerMove = event => {
      pointer = { x: event.clientX, y: event.clientY }
      if (!pointerFrame) pointerFrame = requestAnimationFrame(drawPointer)
    }

    const handlePointerEnter = () => cursor.classList.add('is-visible')
    const handlePointerLeave = () => cursor.classList.remove('is-visible')

    const syncFrame = () => {
      const card = activeId
        ? section.querySelector(`[data-strength-id="${activeId}"]`)
        : null

      if (!card) {
        frame.classList.remove('is-active')
        return
      }

      const rect = card.getBoundingClientRect()
      frame.style.width = `${rect.width}px`
      frame.style.height = `${rect.height}px`
      frame.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`
      frame.style.borderColor = card.dataset.accent
      frame.style.background = card.dataset.tint
      frame.classList.add('is-active')
    }

    const startedAt = window.performance.now()
    const followExpansion = timestamp => {
      syncFrame()
      if (timestamp - startedAt < 480) frameAnimation = requestAnimationFrame(followExpansion)
    }
    frameAnimation = requestAnimationFrame(followExpansion)

    section.addEventListener('pointermove', handlePointerMove, { passive: true })
    section.addEventListener('pointerenter', handlePointerEnter, { passive: true })
    section.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerenter', handlePointerEnter)
      section.removeEventListener('pointerleave', handlePointerLeave)
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      if (frameAnimation) cancelAnimationFrame(frameAnimation)
    }
  }, [activeId, sectionRef])

  return (
    <div className="strength-target-cursor" ref={cursorRef} aria-hidden="true">
      <i className="strength-target-frame" ref={frameRef} />
      <i className="strength-cursor-dot" ref={dotRef} />
    </div>
  )
}
