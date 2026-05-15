import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.directive('scrolla', {
    mounted(el, binding) {
      // 1. 값의 타입에 따라 애니메이션 클래스와 threshold 분기 처리
      const isObj = binding.value && typeof binding.value === 'object'
      const animationClass = isObj ? binding.value.class : binding.value || 'fade-in-up'
      const customThreshold = isObj ? binding.value.threshold : 0.5 // 기본값 0.5

      el.classList.add('animate-init')
      // 초기 방향을 결정짓기 위한 클래스 사전 등록
      el.classList.add(animationClass)

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('animate-start')
            } else {
              el.classList.remove('animate-start')
            }
          })
        },
        { threshold: customThreshold },
      ) // 동적 threshold 적용

      observer.observe(el)
      el._observer = observer
    },
    unmounted(el) {
      if (el._observer) el._observer.disconnect()
    },
  })
})
