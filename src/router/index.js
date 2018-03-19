import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/containers/Game.vue'
import Faq from '@/containers/Faq.vue'
import Top from '@/containers/Top.vue'
import Menu from '@/containers/Menu.vue'
import Profile from '@/containers/User/Profile.vue'
import Signin from '@/containers/User/Signin.vue'
import Signup from '@/containers/User/Signup.vue'
import AddContent from '@/containers/AddContent.vue'
import Stats from '@/containers/User/Stats.vue'
import AuthGuard from './auth-guard.js'
import AdminGuard from './admin-guard.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/game',
      name: 'Game',
      beforeEnter: AuthGuard,
      component: Game
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: AuthGuard,
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/addcontent',
      name: 'Add content',
      beforeEnter: AdminGuard,
      component: AddContent
    },
    {
      path: '/stats',
      name: 'Stats',
      beforeEnter: AuthGuard,
      component: Stats
    }
  ],
  mode: 'history'
})
