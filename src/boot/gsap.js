// src/boot/gsap.js
import {boot} from 'quasar/wrappers'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

export default boot(async ({ app }) => {
  // 브라우저 환경(클라이언트 side)에서만 ScrollSmoother 로드
  if (typeof window !== 'undefined') {
    // Club GreenSock 회원용 비공개 패키지 또는 gsap-trial 패키지에서 가져옵니다.
    const { ScrollSmoother } = await import('gsap/ScrollSmoother')

    // 플러그인 등록
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Composition API 사용자를 위한 Provide 등록
    app.provide('gsap', gsap)
    app.provide('ScrollSmoother', ScrollSmoother)

    // Options API 사용자를 위한 글로벌 프로퍼티 등록 (선택)
    app.config.globalProperties.$gsap = gsap
    app.config.globalProperties.$ScrollSmoother = ScrollSmoother
  }
})
