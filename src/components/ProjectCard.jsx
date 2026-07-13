import { useState } from 'react'

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
      <span className="score-chip">I2V</span>
    </div>
  )
}

function AestheticVisual() {
  return (
    <div className="project-css-visual aesthetic-visual" aria-hidden="true">
      <i className="visual-circle circle-one" />
      <i className="visual-circle circle-two" />
      <i className="visual-circle circle-three" />
      <div className="composition-frame">
        <i className="grid-line vertical-one" />
        <i className="grid-line vertical-two" />
        <i className="grid-line horizontal-one" />
        <i className="grid-line horizontal-two" />
        <span className="focus-point" />
        <span className="lens-mark" />
        <b className="color-chip chip-a" />
        <b className="color-chip chip-b" />
        <b className="color-chip chip-c" />
      </div>
      <span className="annotation annotation-a">构图</span>
      <span className="annotation annotation-b">光影</span>
      <span className="annotation annotation-c">色彩</span>
    </div>
  )
}

function ProjectVisual({ type }) {
  if (type === 'video') return <VideoVisual />
  if (type === 'aesthetic') return <AestheticVisual />
  return <VehicleVisual />
}

export default function ProjectCard({ project, index = 0 }) {
  const [outcomeExpanded, setOutcomeExpanded] = useState(false)

  return (
    <article
      className={`project-component ${project.accent} reveal`}
      style={{ '--reveal-delay': `${index * 90}ms` }}
    >
      <div className="project-component-link">
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
            <div className={`project-outcome ${outcomeExpanded ? 'is-expanded' : ''}`}>
              <strong>{project.outcome.title}</strong>
              <p>{project.outcome.description}</p>
              <button
                type="button"
                aria-expanded={outcomeExpanded}
                onClick={() => setOutcomeExpanded(current => !current)}
              >
                {outcomeExpanded ? '收起' : '展开查看'}
              </button>
            </div>
            <div className="project-tags">
              {project.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <ProjectVisual type={project.visual} />
        </div>
      </div>
      <a
        className="project-component-hit"
        href={`/projects/${project.slug}`}
        aria-label={`查看项目详情：${project.title}`}
      />
    </article>
  )
}
