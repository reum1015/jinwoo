import {boot} from 'quasar/wrappers'

export default boot(({ app }) => {
  app.directive('scrolla', {
    mounted(el, binding) {
      // 초기 상태 클래스 추가
      el.classList.add('animate-init');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const animationClass = binding.value || 'fade-in-up';

          if (entry.isIntersecting) {
            // 1. 화면에 들어왔을 때: 애니메이션 클래스 추가
            el.classList.add(animationClass);
            el.classList.add('animate-start');
          } else {
            // 2. 화면에서 완전히 벗어났을 때: 클래스를 제거하여 초기 상태로 리셋 (once: false 역할)
            el.classList.remove(animationClass);
            el.classList.remove('animate-start');
          }
        });
      }, {
        threshold: 0.5 // 요소가 10% 이상 보일 때 체크
      });

      observer.observe(el);
      el._observer = observer;
    },
    unmounted(el) {
      if (el._observer) el._observer.disconnect();
    }
  });
});
