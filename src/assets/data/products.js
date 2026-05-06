export const product = [
  {
    id: 1,
    name: 'Insulation Kit',
    imgUrl: new URL('src/assets/imgs/productThumbnail/Spiral Wound Gasket.png', import.meta.url)
      .href,
  },
]

// src/assets/product.js

// 1. 우선 id 없이 데이터만 배열로 만듭니다.
const rawData = [
  { name: 'Insulation Kit', imgName: 'Spiral Wound Gasket.png' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket004.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket005.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket006.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  { name: 'Gasket Item 2', imgName: 'gasket003.jpg' },
  // ... 나머지 11개 입력
]

// 2. map을 사용하여 id와 완성된 imgUrl을 자동으로 추가합니다.
export const products = rawData.map((item, index) => ({
  id: index + 1, // 1부터 순서대로 id 부여
  name: item.name,
  imgUrl: new URL(`/src/assets/imgs/productThumbnail/${item.imgName}`, import.meta.url).href,
}))
