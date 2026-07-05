import { useCallback, useState } from 'react'
import portfolioData from '../../data/portfolioData'
import FeaturedWorkHero from './FeaturedWorkHero'
import ImageModal from './ImageModal'
import KeyFrames from './KeyFrames'
import VideoModal from './VideoModal'
import Workflow from './Workflow'

export default function PortfolioSection() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [activeFrame, setActiveFrame] = useState(null)
  const closeVideo = useCallback(() => setVideoOpen(false), [])
  const closeFrame = useCallback(() => setActiveFrame(null), [])

  const scrollToFrames = () => {
    document.getElementById('final-frames')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="portfolio-section" id="edge-x">
      <div className="portfolio-shell">
        <FeaturedWorkHero
          work={portfolioData.featured}
          onPlay={() => setVideoOpen(true)}
          onViewFrames={scrollToFrames}
        />
        <KeyFrames frames={portfolioData.keyFrames} onOpen={setActiveFrame} />
        <Workflow items={portfolioData.workflow} />
      </div>
      <VideoModal open={videoOpen} video={portfolioData.featured.video} onClose={closeVideo} />
      <ImageModal frame={activeFrame} onClose={closeFrame} />
    </section>
  )
}
