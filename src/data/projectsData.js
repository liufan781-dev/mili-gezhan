const projectsData = [
  {
    id: '01',
    slug: 'vehicle-caption',
    eyebrow: 'DATA CONSTRUCTION',
    title: '车载场景图片标签与 Caption 构建',
    description:
      '面向辅助驾驶与智能座舱场景，参与车载道路图片的标签挂载、Caption 构建、质量复核及自动化流程搭建。',
    metrics: [
      { value: '800—1000 条', label: '个人处理样本' },
      { value: '80+ 条', label: '典型 Badcase' },
    ],
    tags: ['车载场景', '图像理解', 'Caption', '数据构建'],
    accent: 'orange',
    visual: 'vehicle',
    detail:
      '项目围绕车载道路场景的数据理解与表达展开，通过标签体系、Caption 规范、质量复核和自动化辅助流程，为后续模型训练提供结构清晰、描述准确的数据。',
  },
  {
    id: '02',
    slug: 'ecommerce-video-evaluation',
    eyebrow: 'MODEL EVALUATION',
    title: '电商广告图生视频模型评测',
    description:
      '面向电商广告素材生成场景，参与评测集构建、样本难度设计、质量把关及不同模型生成效果的横向评测。',
    metrics: [
      { value: '约 300 条', label: '评测集样本质检' },
      { value: '持续沉淀', label: '典型 Badcase 与模型适用建议' },
    ],
    tags: ['图生视频', '电商广告', '模型评测', '质量控制'],
    accent: 'blue',
    visual: 'video',
    detail:
      '项目从主体一致性、Prompt 响应、画面质量、运动稳定性和商用风险等维度观察模型表现，通过横向对比与问题归因，为模型选择和后续迭代提供数据依据。',
  },
]

export default projectsData
