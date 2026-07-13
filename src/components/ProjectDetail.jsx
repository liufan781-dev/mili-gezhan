import projectsData from '../data/projectsData'

export default function ProjectDetail({ slug }) {
  const project = projectsData.find(item => item.slug === slug)

  if (!project) {
    return (
      <main className="project-detail-page">
        <a href="/#projects">← 返回项目经历</a>
        <h1>项目不存在</h1>
      </main>
    )
  }

  return (
    <main className={`project-detail-page ${project.accent}`}>
      <a className="project-detail-back" href="/#projects">← 返回项目经历</a>
      <p>{project.id} / {project.eyebrow}</p>
      <h1>{project.detailTitle || project.title}</h1>
      <p className="project-detail-lead">{project.description}</p>
      <section className="project-detail-body">
        <h2>{project.responsibilities ? '项目背景' : '项目概览'}</h2>
        <p>{project.detail}</p>
        {project.responsibilities && (
          <div className="project-detail-section-list">
            <h2>核心职责</h2>
            {project.responsibilities.map((item, itemIndex) => (
              <article key={item.title}>
                <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
        {project.results && (
          <div className="project-detail-section-list">
            <h2>项目成果</h2>
            {project.results.map((item, itemIndex) => (
              <article key={item.title}>
                <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="project-detail-metrics">
          {project.metrics.map(metric => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
        <div className="project-tags">
          {project.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </section>
    </main>
  )
}
