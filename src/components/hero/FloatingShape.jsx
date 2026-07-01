export default function FloatingShape({ shape }) {
  const style = {
    '--enter-delay': `${shape.enterDelay}ms`,
    '--enter-x': `${shape.enterX}px`,
    '--enter-y': `${shape.enterY}px`,
    '--mobile-enter-x': `${shape.mobileEnterX}px`,
    '--mobile-enter-y': `${shape.mobileEnterY}px`,
    '--enter-rotation': shape.enterRotation,
    '--overshoot-x': `${shape.overshootX}px`,
    '--overshoot-y': `${shape.overshootY}px`,
    '--overshoot-rotation': shape.overshootRotation,
    '--float-duration': `${shape.floatDuration}s`,
    '--float-distance': `${-shape.floatDistance}px`,
    '--shape-rotation': shape.rotation,
  }

  return (
    <i
      className={`candy floating-shape ${shape.className}`}
      data-hero-shape
      data-repel-strength={shape.repelStrength}
      data-repel-radius={shape.repelRadius}
      style={style}
    >
      <span className="shape-enter">
        <span className="shape-visual">{shape.content}</span>
      </span>
    </i>
  )
}
