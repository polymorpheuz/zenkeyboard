// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import { store } from './store'
import DateFilter from './filters/date.js'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyC0YQEftb3uF-CXvcS1gFVa4zr20nKTXD4",
      authDomain: "zenkeyboard-f8d44.firebaseapp.com",
      databaseURL: "https://zenkeyboard-f8d44.firebaseio.com",
      projectId: "zenkeyboard-f8d44",
      storageBucket: "zenkeyboard-f8d44.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('autoSetUserData')
        this.$store.dispatch('autoSetUserInfo')
      }
    })
  }
})
