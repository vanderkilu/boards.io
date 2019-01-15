import Vue from 'vue'
import Router from 'vue-router'
import BoardContainer from './components/BoardContainer.vue'

Vue.use(Router)

export default new Router({
  routes: [
     {
       path: '/',
       name: 'boardContainer',
       component: BoardContainer
     }
  ]
})
