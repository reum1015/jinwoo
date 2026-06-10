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
  { name: 'InsulationKit', imgName: 'InsulationKit.png' },
  { name: 'MetalJacketed', imgName: 'MetalJacketed.png' },
  { name: 'MICA', imgName: 'MICA.png' },
  { name: 'Non-asbestos', imgName: 'Non-asbestos.png' },
  { name: 'E-Flon', imgName: 'E-Flon.png' },
  { name: 'GraphiteTape', imgName: 'GraphiteTape.png' },
  { name: 'Kamprofile', imgName: 'Kamprofile.png' },
  { name: 'E-PTFE', imgName: 'E-PTFE.png' },
  { name: 'RingTypeJoint', imgName: 'RingTypeJoint.png' },
  { name: 'SemiconductorProduct', imgName: 'SemiconductorProduct.png' },
  { name: 'SpiralWound', imgName: 'SpiralWound.png' },
  { name: 'TopSeal', imgName: 'TopSeal.png' },
  { name: 'Rubber', imgName: 'Rubber.png' },
  // ... 나머지 11개 입력
]

// 2. map을 사용하여 id와 완성된 imgUrl을 자동으로 추가합니다.
export const products = rawData.map((item, index) => ({
  id: index + 1, // 1부터 순서대로 id 부여
  name: item.name,
  imgUrl: new URL(`/src/assets/imgs/productThumbnail/${item.imgName}`, import.meta.url).href,
}))
