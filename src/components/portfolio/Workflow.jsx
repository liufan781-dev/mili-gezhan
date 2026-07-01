export default function Workflow({ items }) {
  return (
    <section className="portfolio-block portfolio-workflow" aria-labelledby="workflow-title">
      <div className="portfolio-block-heading">
        <h3 id="workflow-title"><span>WORKFLOW</span> / 工作流程</h3>
      </div>
      <div className="workflow-grid">
        {items.map((item, index) => (
          <div className="workflow-item" key={item.no}>
            <article>
              <span>{item.no}</span>
              <div className={`workflow-symbol workflow-symbol-${index + 1}`} aria-hidden="true">
                <i /><i /><i />
              </div>
              <h4>{item.title}</h4>
              <p>{item.english}</p>
            </article>
            {index < items.length - 1 && <b className="workflow-arrow" aria-hidden="true">→</b>}
          </div>
        ))}
      </div>
    </section>
  )
}
