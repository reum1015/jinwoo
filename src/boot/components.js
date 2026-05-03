import { boot } from 'quasar/wrappers'
import HeaderNavBar from 'layouts/HeaderNavBar.vue'

export default boot(({app}) =>{
  app.component('HeaderNavBar',HeaderNavBar);
})
