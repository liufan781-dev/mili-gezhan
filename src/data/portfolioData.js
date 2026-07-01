const portfolioData = {
  featured: {
    eyebrow: 'FEATURED WORK',
    title: 'EDGE X《越过边界》',
    subtitle: 'AI COMMERCIAL FILM',
    description:
      '围绕虚构运动相机品牌 EDGE X，完成从产品视觉、场景生成、图生视频到剪辑成片的完整 AI 广告制作流程。',
    tags: ['AI 广告', '图生视频', '商业短片', '视觉叙事'],
    video: '/videos/edge-x-boundary-web.mp4',
    poster: '/images/edge-x/final-product.webp',
  },
  keyFrames: [
    { title: '产品特写', image: '/images/edge-x/final-product.webp', position: '50% 52%' },
    { title: '山地骑行', image: '/images/edge-x/final-riding.webp', position: '50% 48%' },
    { title: '第一视角', image: '/images/edge-x/final-pov.webp', position: '50% 50%' },
    { title: '腾空瞬间', image: '/images/edge-x/jump.webp', position: '50% 48%' },
  ],
  workflow: [
    { no: '01', title: '概念设定', english: 'Concept' },
    { no: '02', title: 'Prompt 设计', english: 'Prompt' },
    { no: '03', title: '图像生成', english: 'Images' },
    { no: '04', title: '视频生成', english: 'Video' },
    { no: '05', title: '剪辑成片', english: 'Edit' },
  ],
}

export default portfolioData
