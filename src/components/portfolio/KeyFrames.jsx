export default function KeyFrames({ frames, onOpen }) {
  return (
    <section className="portfolio-block key-frames" id="final-frames" aria-labelledby="key-frames-title">
      <div className="portfolio-block-heading">
        <h3 id="key-frames-title"><span>FINAL FRAMES</span> / 成片画面</h3>
      </div>
      <div className="key-frame-track">
        {frames.map((frame, index) => (
          <article className="key-frame-card" key={`${frame.title}-${index}`}>
            <button
              className="key-frame-image"
              type="button"
              aria-label={`查看${frame.title}大图`}
              onClick={() => onOpen(frame)}
            >
              <img
                src={frame.image}
                alt={frame.title}
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: frame.position }}
              />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
            <h4>{frame.title}</h4>
          </article>
        ))}
      </div>
    </section>
  )
}
