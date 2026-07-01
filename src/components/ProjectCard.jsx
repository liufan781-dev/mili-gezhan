function VehicleVisual() {
  return (
    <div className="project-css-visual vehicle-visual" aria-hidden="true">
      <i className="visual-circle circle-one" />
      <i className="visual-circle circle-two" />
      <i className="visual-circle circle-three" />
      <div className="road-lines"><i /><i /><i /></div>
      <div className="vehicle-outline">
        <span className="vehicle-body" />
        <i className="wheel left" />
        <i className="wheel right" />
      </div>
      <span className="annotation annotation-a">车辆</span>
      <span className="annotation annotation-b">道路标志</span>
      <b className="location-dot dot-a" />
      <b className="location-dot dot-b" />
    </div>
  )
}

function VideoVisual() {
  return (
    <div className="project-css-visual video-visual" aria-hidden="true">
      <i className="visual-circle circle-one" />
      <i className="visual-circle circle-two" />
      <div className="video-frame">
        <span className="play-button" />
        <div className="score-bars"><i /><i /><i /><i /></div>
        <div className="trend-line">
          <i /><i /><i /><i />
          <b /><b /><b /><b />
        </div>
        <div className="video-timeline"><span /></div>
      </div>
      <span className="score-chip">4.6 / 5</span>
    </div>
  )
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article
      className={`project-component ${project.accent} reveal`}
      style={{ '--reveal-delay': `${index * 90}ms` }}
    >
      <a className="project-component-link" href={`/projects/${project.slug}`}>
        <header className="project-component-header">
          <span>{project.id}</span>
          <b aria-hidden="true">↗</b>
        </header>
        <div className="project-component-layout">
          <div className="project-component-content">
            <p className="project-component-eyebrow">{project.eyebrow}</p>
            <h3>{project.title}</h3>
            <p className="project-component-description">{project.description}</p>
            <div className="project-metrics">
              {project.metrics.map(metric => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="project-tags">
              {project.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          {project.visual === 'vehicle' ? <VehicleVisual /> : <VideoVisual />}
        </div>
      </a>
    </article>
  )
}
