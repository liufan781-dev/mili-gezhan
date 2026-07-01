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
      <h1>{project.title}</h1>
      <p className="project-detail-lead">{project.description}</p>
      <section className="project-detail-body">
        <h2>项目概览</h2>
        <p>{project.detail}</p>
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
