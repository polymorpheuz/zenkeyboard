import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game.vue'
import Faq from '@/components/Faq.vue'
import Top from '@/components/Top.vue'
import Menu from '@/components/Menu.vue'
import Profile from '@/components/User/Profile.vue'
import Signin from '@/components/User/Signin.vue'
import Signup from '@/components/User/Signup.vue'
import AddContent from '@/components/AddContent.vue'
import Statistics from '@/components/User/Statistics.vue'
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
      path: '/statistics',
      name: 'Statistics',
      beforeEnter: AuthGuard,
      component: Statistics
    }
  ],
  mode: 'history'
})
