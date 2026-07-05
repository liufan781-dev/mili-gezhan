const projectsData = [
  {
    id: '01',
    slug: 'vehicle-caption',
    eyebrow: 'DATA CONSTRUCTION',
    title: '车载场景图片标签与 Caption 构建',
    description:
      '面向辅助驾驶与智能座舱场景，参与车载道路图片的标签挂载、Caption 构建、质量复核及自动化流程搭建。',
    metrics: [
      { value: '3000 条', label: '核心样本处理' },
      { value: '80+ 条', label: '典型 Badcase' },
    ],
    outcome: {
      title: '标签自动化与人效提升',
      description:
        '自动化上线后，结构化标签由人工逐项挂载转为系统自动生成，原 6 名标注人员仅需完成 Caption 改写，减少约 2—3 人等效标签挂载人力，支撑约 5 万条车载数据批量交付。',
    },
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
    outcome: {
      title: '人员管理与试标 SOP',
      description:
        '协助完成新人入项试标、规则培训、数据统计样板搭建及答疑文档整理，拉齐规则理解一致性；通过准确率看板和专项复盘跟踪人员表现，推动新人爬坡周期由约 4 天缩短至 2 天，试标准确率由约 88% 提升至 95% 以上，个人质检准确率稳定在 97% 左右，协助团队稳定推进数据交付。',
    },
    tags: ['图生视频', '电商广告', '模型评测', '质量控制'],
    accent: 'blue',
    visual: 'video',
    detail:
      '项目从主体一致性、Prompt 响应、画面质量、运动稳定性和商用风险等维度观察模型表现，通过横向对比与问题归因，为模型选择和后续迭代提供数据依据。',
  },
]

export default projectsData
