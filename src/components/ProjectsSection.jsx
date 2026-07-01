import projectsData from '../data/projectsData'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  return (
    <section className="projects section" id="projects">
      <div className="shell">
        <div className="projects-heading reveal">
          <span>04 / PROJECT EXPERIENCE</span>
          <h2>Projects <em>项目经历</em></h2>
          <p>简单记录我参与过的项目，点击卡片可查看项目详情。</p>
        </div>
        <div className="projects-cards">
          {projectsData.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
        <a className="project-view-more reveal" href="#portfolio">
          View More <b>↓</b>
        </a>
      </div>
    </section>
  )
}
