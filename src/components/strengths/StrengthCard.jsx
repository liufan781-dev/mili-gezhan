export default function StrengthCard({ item, active, muted, entered, index, onActivate }) {
  const style = {
    '--strength-accent': item.color,
    '--strength-tint': item.tint,
    '--strength-delay': `${100 + index * 85}ms`,
    '--strength-float-duration': item.floatDuration,
  }

  return (
    <article
      className={`strength-card ${active ? 'is-active' : ''} ${muted ? 'is-muted' : ''} ${entered ? 'is-entered' : ''}`}
      data-strength-id={item.id}
      data-accent={item.color}
      data-tint={item.tint}
      style={style}
      tabIndex="0"
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <span className="strength-side-line" aria-hidden="true" />
      <div className="strength-card-top">
        <span className="strength-number">{item.id}</span>
        <b className="strength-arrow" aria-hidden="true">↗</b>
      </div>
      <div className="strength-shape" aria-hidden="true"><i /><i /></div>
      <div className="strength-card-copy">
        <small>{item.english}</small>
        <h3>{item.title}</h3>
        <i className="strength-title-line" aria-hidden="true" />
        <p className="strength-short">{item.shortDescription}</p>
        <p className="strength-full">{item.fullDescription}</p>
        <div className="strength-keywords">
          {item.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}
        </div>
      </div>
    </article>
  )
}
