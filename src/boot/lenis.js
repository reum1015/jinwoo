import { boot } from 'quasar/wrappers'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default boot(({ router }) => {
  // SSR(서버 사이드 렌더링) 환경인 경우 브라우저 전용 코드 실행 방지
  if (process.env.SERVER) return

  // 1. 전역 Lenis 인스턴스 초기화
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.1,
  })

  // 2. GSAP ScrollTrigger와 Lenis 동기화
  lenis.on('scroll', ScrollTrigger.update)

  // 3. GSAP 틱커에 Lenis 실행 함수 연결
  const updateLenis = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(updateLenis)
  gsap.ticker.lagSmoothing(0)

  // 4. 전역 라우터 가드: 페이지 이동 시 스크롤 제어
  router.beforeEach((to, from, next) => {
    // 이동하기 전, 기존 페이지의 모든 ScrollTrigger 강제 파괴 (메모리 누수 및 충돌 방지)
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    next()
  })

  router.afterEach(() => {
    // 페이지 이동이 완료된 직후 스크롤 최상단으로 강제 이동 및 초기화
    lenis.scrollTo(0, { immediate: true })

    // 약간의 딜레이를 주어 새 페이지 레이아웃이 잡힌 후 트리거 위치 재계산
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  })

  // 필요한 경우 다른 컴포넌트에서 window.lenis로 접근할 수 있도록 글로벌 등록
  window.lenis = lenis
})
