export const colorGallery = [
  '/images/visual-studies/color/color-01.webp',
  '/images/visual-studies/color/color-02.webp',
  '/images/visual-studies/color/color-03.webp',
  '/images/visual-studies/color/color-04.webp',
  '/images/visual-studies/color/color-05.webp',
]

export const architectureGallery = [
  '/images/visual-studies/architecture/architecture-01.webp',
  '/images/visual-studies/architecture/architecture-02.webp',
  '/images/visual-studies/architecture/architecture-03.webp',
  '/images/visual-studies/architecture/architecture-04.webp',
  '/images/visual-studies/architecture/architecture-05.webp',
]

export const materialGallery = [
  '/images/visual-studies/material/material-01.webp',
  '/images/visual-studies/material/material-02.webp',
  '/images/visual-studies/material/material-03.webp',
  '/images/visual-studies/material/material-04.webp',
]

const visualStudiesData = [
  {
    id: 'color-composition',
    index: '01',
    titleEn: 'Color & Composition',
    titleZh: '色彩与构成',
    backgroundImage: colorGallery[0],
    focusImage: colorGallery[1],
    galleryImages: colorGallery,
  },
  {
    id: 'space-architecture',
    index: '02',
    titleEn: 'Space & Architecture',
    titleZh: '空间与建筑',
    backgroundImage: architectureGallery[0],
    focusImage: architectureGallery[1],
    galleryImages: architectureGallery,
  },
  {
    id: 'material-texture',
    index: '03',
    titleEn: 'Material & Texture',
    titleZh: '材质与肌理',
    backgroundImage: materialGallery[0],
    focusImage: materialGallery[1],
    galleryImages: materialGallery,
  },
]

export default visualStudiesData
