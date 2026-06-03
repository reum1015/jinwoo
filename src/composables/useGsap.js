import {inject} from 'vue'

export function useGsap() {
  return {
    gsap: inject('gsap'),
    ScrollTrigger: inject('ScrollTrigger'),
    ScrollSmoother: inject('ScrollSmoother'),
  }
}
