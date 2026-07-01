import { useEffect } from 'react'

export default function useMouseRepel(heroRef) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const shapes = [...hero.querySelectorAll('[data-hero-shape]')]
    hero.classList.add('hero-shapes-entering')
    const entryTimer = window.setTimeout(() => {
      hero.classList.remove('hero-shapes-entering')
    }, 1220)

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => hero.classList.toggle('hero-shapes-paused', !entry.isIntersecting),
      { threshold: 0.04 },
    )
    visibilityObserver.observe(hero)

    if (reducedMotion.matches || !finePointer.matches) {
      return () => {
        window.clearTimeout(entryTimer)
        visibilityObserver.disconnect()
      }
    }

    const motion = new Map(
      shapes.map(shape => [shape, { x: 0, y: 0, targetX: 0, targetY: 0 }]),
    )
    let pointer = null
    let animationFrame = 0

    const update = () => {
      let stillMoving = false

      shapes.forEach(shape => {
        const state = motion.get(shape)
        const rect = shape.getBoundingClientRect()
        const baseCenterX = rect.left + rect.width / 2 - state.x
        const baseCenterY = rect.top + rect.height / 2 - state.y
        const radius = Number(shape.dataset.repelRadius)
        const strength = Number(shape.dataset.repelStrength)

        if (pointer) {
          const deltaX = baseCenterX - pointer.x
          const deltaY = baseCenterY - pointer.y
          const distance = Math.hypot(deltaX, deltaY)

          if (distance > 0 && distance < radius) {
            const force = (1 - distance / radius) * strength
            state.targetX = (deltaX / distance) * force
            state.targetY = (deltaY / distance) * force
          } else {
            state.targetX = 0
            state.targetY = 0
          }
        } else {
          state.targetX = 0
          state.targetY = 0
        }

        state.x += (state.targetX - state.x) * 0.16
        state.y += (state.targetY - state.y) * 0.16

        if (Math.abs(state.targetX - state.x) < 0.05) state.x = state.targetX
        if (Math.abs(state.targetY - state.y) < 0.05) state.y = state.targetY

        shape.style.setProperty('--repel-x', `${state.x.toFixed(2)}px`)
        shape.style.setProperty('--repel-y', `${state.y.toFixed(2)}px`)

        if (state.x !== state.targetX || state.y !== state.targetY) stillMoving = true
      })

      animationFrame = stillMoving ? requestAnimationFrame(update) : 0
    }

    const ensureFrame = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update)
    }

    const handlePointerMove = event => {
      if (hero.classList.contains('hero-shapes-entering')) return
      pointer = { x: event.clientX, y: event.clientY }
      ensureFrame()
    }

    const handlePointerLeave = () => {
      pointer = null
      ensureFrame()
    }

    hero.addEventListener('pointermove', handlePointerMove, { passive: true })
    hero.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      visibilityObserver.disconnect()
      window.clearTimeout(entryTimer)
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', handlePointerLeave)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [heroRef])
}
