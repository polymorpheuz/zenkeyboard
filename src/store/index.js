import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import addContent from './modules/addContent'
import auth from './modules/auth'
import game from './modules/game'
import top from './modules/top'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  modules: {
    app,
    addContent,
    auth,
    game,
    top
  },
  strict: debug
})
