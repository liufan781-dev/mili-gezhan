import { useEffect, useRef, useState } from 'react'
import { profile } from './data'
import ProjectsSection from './components/ProjectsSection'
import ProjectDetail from './components/ProjectDetail'
import PortfolioSection from './components/portfolio/PortfolioSection'
import FloatingShape from './components/hero/FloatingShape'
import heroShapes from './data/heroShapesData'
import useMouseRepel from './hooks/useMouseRepel'
import useSiteMotion from './hooks/useSiteMotion'
import StrengthsSection from './components/strengths/StrengthsSection'
import VisualStudies from './components/VisualStudies'

function Header() {
  const sections = [
    ['首页', 'home'],
    ['作品集', 'portfolio'],
    ['项目经历', 'projects'],
    ['关于我', 'about'],
    ['个人优势', 'strengths'],
    ['联系我', 'contact'],
  ]
  const validIds = sections.map(([, id]) => id)
  const rawHash = window.location.hash.replace('#', '')
  const initialHash = ['visual-studies', 'edge-x'].includes(rawHash) ? 'portfolio' : rawHash
  const [activeSection, setActiveSection] = useState(
    validIds.includes(initialHash) ? initialHash : 'home',
  )

  const handleNavClick = (event, id) => {
    event.preventDefault()
    setActiveSection(id)
    window.history.pushState(null, '', `#${id}`)
    const target = document.getElementById(id)
    if (!target) return
    const navOffset = 108
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
  }

  useEffect(() => {
    const nodes = validIds
      .map(id => document.getElementById(id))
      .filter(Boolean)
    let restoringInitialHash = validIds.includes(initialHash)
    let releaseInitialHash

    if (restoringInitialHash) {
      window.requestAnimationFrame(() => {
        document.getElementById(initialHash)?.scrollIntoView({ behavior: 'auto' })
        setActiveSection(initialHash)
      })
      releaseInitialHash = window.setTimeout(() => {
        restoringInitialHash = false
      }, 350)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (restoringInitialHash) return
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      {
        rootMargin: '-18% 0px -68% 0px',
        threshold: 0,
      },
    )

    nodes.forEach(node => observer.observe(node))
    return () => {
      observer.disconnect()
      window.clearTimeout(releaseInitialHash)
    }
  }, [])

  return (
    <header className="nav-wrap">
      <nav>
        {sections.map(([label, id]) => (
          <a
            className={activeSection === id ? 'active' : ''}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? 'page' : undefined}
            onClick={event => handleNavClick(event, id)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  const heroRef = useRef(null)
  useMouseRepel(heroRef)

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-opening" aria-hidden="true">
        <div className="hero-opening-copy">
          <span>MILLY</span>
          <strong>AI TRAINER · PORTFOLIO 2026</strong>
          <i className="hero-opening-line" />
        </div>
      </div>
      <Header />
      <div className="hero-candy" aria-hidden="true">
        {heroShapes.map(shape => <FloatingShape shape={shape} key={shape.id} />)}
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>MILLY · AI TRAINER ·</span>
          <span>MILLY · AI TRAINER ·</span>
          <span>MILLY · AI TRAINER ·</span>
          <span>MILLY · AI TRAINER ·</span>
        </div>
      </div>
      <div className="hero-center">
        <div className="hero-heading">
          <h1>hi，我是<span>{profile.name}</span>。</h1>
          <p>AI 训练师 · 模型评测 · 数据构建</p>
        </div>
        <div className="hero-person" aria-label="可翻转的人物图片卡片">
          <div className="hero-person-inner">
            <div className="hero-person-front">
              <div className="hero-avatar">
                <i className="avatar-hair" />
                <i className="avatar-eye left" />
                <i className="avatar-eye right" />
                <i className="avatar-smile" />
              </div>
              <img
                src="/profile.webp"
                width="800"
                height="800"
                decoding="async"
                fetchPriority="high"
                alt="个人形象照"
                onError={event => { event.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="hero-person-back">
              <span>AI TRAINER</span>
              <strong>MILLY</strong>
              <p>MODEL EVALUATION<br />DATA CONSTRUCTION<br />PROMPT DESIGN</p>
              <b>KEEP CURIOUS ✦</b>
            </div>
          </div>
        </div>
        <p className="hero-description">
          我喜欢把复杂的问题拆解成清晰的规则、流程和可执行方案。
        </p>
        <a className="hero-button" href="#contact">Let's Work Together! <b>↓</b></a>
      </div>
      <span className="hero-index">AI TRAINER · PORTFOLIO 2026</span>
    </section>
  )
}

function About() {
  const aboutCards = [
    {
      no: '01',
      eyebrow: 'ABOUT ME',
      title: '从 2025 年开始，进入 AI 数据训练领域',
      paragraphs: [
        '2025 年，我开始接触 AI 数据训练与多模态项目，先后参与图片标签、Caption 构建、图生视频评测和音视频生成评测等工作。',
        '在项目中，我逐渐意识到，AI 训练并不只是完成一条条数据，而是需要在业务需求、规则标准和模型表现之间建立清晰的连接。',
        '我喜欢把模糊问题拆解成具体标准，把复杂流程整理成可以执行、检查和复用的方法。',
      ],
      keywords: ['AI 训练师', '多模态数据', '模型评测', '数据质量'],
    },
    {
      no: '02',
      eyebrow: 'WHAT I DO',
      title: '把复杂任务拆解成清晰、可执行的标准',
      paragraphs: [
        '我熟悉图片、视频、音频等多模态数据处理流程，能够参与规则理解、试标对齐、Caption 编写、质量复核、Badcase 整理和问题归因。',
        '在模型评测中，我会将生成效果拆解为主体一致性、Prompt 响应、画面质量、运动稳定性、音频表现和商用风险等可观察维度，帮助团队更准确地定位问题。',
        '相比只判断“好或不好”，我更关注问题为什么发生，以及数据和规则如何进一步优化。',
      ],
      keywords: ['规则理解', 'Caption', 'Badcase 分析', '多模态评测'],
    },
    {
      no: '03',
      eyebrow: 'HOW I WORK',
      title: '让人、规则与模型更好协作',
      paragraphs: [
        '在项目推进中，我不仅参与数据生产和质检，也会协助新人试标、规则培训、答疑文档整理、数据统计和结果复盘。',
        '我习惯从重复、低效和容易产生分歧的环节出发，通过试标 SOP、规则文档、Prompt 模板和自动化工作流，减少重复人工操作，提升团队理解一致性和交付稳定性。',
        '对我来说，好的数据工作不只是完成数量，更重要的是让规则更清楚、流程更稳定、结果更可信。',
      ],
      keywords: ['试标 SOP', '培训答疑', '质量复盘', '自动化提效'],
    },
  ]

  return (
    <section className="about section" id="about">
      <div className="shell">
        <div className="about-heading reveal">
          <span>01 / ABOUT</span>
          <h2>About Me <em>关于我</em></h2>
          <p>向下滚动，了解我如何理解工作、拆解问题并推动协作。</p>
        </div>
        <div className="about-stack">
          {aboutCards.map((card, index) => (
            <article
              className={`about-card about-card-${index + 1}`}
              style={{ '--card-index': index }}
              key={card.eyebrow}
            >
              <div
                className="about-card-content reveal"
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <div className="about-card-meta">
                  <span>{card.no}</span>
                  <b>{card.eyebrow}</b>
                  <i>SCROLL ↓</i>
                </div>
                <h3>{card.title}</h3>
                <div className="about-card-copy">
                  {card.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="about-keywords">
                  <span>关键词</span>
                  <div>{card.keywords.map(keyword => <b key={keyword}>{keyword}</b>)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const phone = '13956359582'
  const email = '3220516731@qq.com'
  const [revealed, setRevealed] = useState({ phone: false, wechat: false })
  const [toast, setToast] = useState('')
  const [entered, setEntered] = useState(false)
  const contactRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setEntered(true),
      { threshold: 0.18 },
    )
    if (contactRef.current) observer.observe(contactRef.current)
    return () => observer.disconnect()
  }, [])

  const showContact = type => {
    setRevealed(current => ({ ...current, [type]: true }))
  }

  const copyValue = async (type, value, label) => {
    setRevealed(current => ({ ...current, [type]: true }))
    try {
      await navigator.clipboard.writeText(value)
      setToast(`${label}已复制`)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
      setToast(`${label}已复制`)
    }
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <section className="contact" id="contact" ref={contactRef}>
      <div className="contact-accent" aria-hidden="true"><i /><i /></div>
      <div className="shell contact-inner">
        <div className={`contact-content ${entered ? 'entered' : ''}`}>
          <div className="contact-availability">
            <span>CONTACT / 联系我</span>
          </div>
          <h2>很高兴认识你，<br /><em>也期待与你聊聊。</em></h2>
          <p className="contact-intro">
            如果你正在寻找 AI 训练师、多模态模型评测、数据构建或生成式内容相关人才，欢迎与我联系。
          </p>

          <div className="contact-panel">
            <div className="contact-methods">
              <div className="contact-method">
                <span>电话</span>
                <strong>{revealed.phone ? phone : '139****9582'}</strong>
                <div>
                  {!revealed.phone && <button onClick={() => showContact('phone')}>显示</button>}
                  <button onClick={() => copyValue('phone', phone, '电话')}>复制</button>
                </div>
              </div>
              <div className="contact-method">
                <span>微信</span>
                <strong>{revealed.wechat ? phone : '139****9582'}</strong>
                <div>
                  {!revealed.wechat && <button onClick={() => showContact('wechat')}>显示</button>}
                  <button onClick={() => copyValue('wechat', phone, '微信')}>复制</button>
                </div>
              </div>
              <div className="contact-method email">
                <span>邮箱</span>
                <a href={`mailto:${email}`}>{email}</a>
                <button onClick={() => copyValue('email', email, '邮箱')}>复制</button>
              </div>
            </div>

            <div className="contact-actions">
              <a className="contact-action primary" href={`mailto:${email}`}>
                发送邮件 <b>↗</b>
              </a>
              {/* TODO: 收到正式简历后，将下方链接替换为真实 PDF 文件。 */}
              <a className="contact-action secondary" href="/resume-placeholder.txt" download>
                下载简历 <b>↓</b>
              </a>
            </div>
          </div>
        </div>
        <footer className="contact-footer">
          <span>© 2026 {profile.name} · AI TRAINER</span>
          <span>MILI · AI TRAINER · 2026</span>
          <a href="#home">BACK TO TOP <b>↑</b></a>
        </footer>
      </div>
      <div className={`copy-toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}

export default function App() {
  const projectSlug = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  useSiteMotion(!projectSlug)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  if (projectSlug) {
    return <ProjectDetail slug={projectSlug} />
  }

  return (
    <main>
      <Hero />
      <div className="portfolio-group" id="portfolio">
        <VisualStudies />
        <PortfolioSection />
      </div>
      <ProjectsSection />
      <About />
      <StrengthsSection />
      <Contact />
    </main>
  )
}
