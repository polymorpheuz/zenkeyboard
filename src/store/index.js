import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedBookSnippet: '',
    loadedRacingHistory: [],
    topResults: [],
    record: '',
    successRate: '',
    averageSpeed: '',
    user: null,
    isAdmin: false,
    avatarLink: '',
    nickname: '',
    errorMessage: '',
    allNicknames: [],
    lastRaceKey: '',
    moreThenFiftyRaces: false
  },
  mutations: {
    setRacingHistory (state, payload) {
      state.loadedRacingHistory = payload
    },
    setAverageSpeed (state, payload) {
      state.averageSpeed = payload
    },
    setSuccessRate (state, payload) {
      state.successRate = payload
    },
    setRecord (state, payload) {
      state.record = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserData (state, payload) {
      state.isAdmin = payload.isAdmin
      state.avatarLink = payload.avatarLink
      state.nickname = payload.nickname
    },
    setLoadedBookSnippet (state, payload) {
      state.loadedBookSnippet = payload
    },
    toggleLoaded (state, payload) {
      state.isLoaded = !state.isLoaded
    },
    setErrorMessage (state, payload) {
      state.errorMessage = payload
    },
    clearErrorMessage (state, payload) {
      state.errorMessage = payload
    },
    setAllNicknames (state, payload) {
      state.allNicknames = payload
    },
    setLastRaceKey (state, payload) {
      state.lastRaceKey = payload
    },
    setMoreThenFiftyRaces (state, payload) {
      state.moreThenFiftyRaces = payload
    },
    setTopResults (state, payload) {
      state.topResults = payload
    }
  },
  actions: {
    addContent ({commit}, payload) {
      const bookData = {
        authorName: payload.authorName,
        bookTitle: payload.bookTitle,
        imageUrl: payload.imageUrl,
        text: payload.text
      }
      firebase.database().ref('bookSnippets').push(bookData)
        .catch((error) => {
          console.log(error)
        })
    },
    getBookSnippet ({commit}, payload) {
      firebase.database().ref('bookSnippets').once('value')
        .then((data) => {
          const bookData = []
          const obj = data.val()
          for (let key in obj) {
            bookData.push({
              authorName: obj[key].authorName,
              bookTitle: obj[key].bookTitle,
              imageUrl: obj[key].imageUrl,
              text: obj[key].text
            })
          }
          const randomNumber = Math.floor(Math.random() * bookData.length)
          const chosenSnippet = bookData[randomNumber]
          commit('setLoadedBookSnippet', chosenSnippet)
          commit('toggleLoaded')
        })
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            const userData = {
              avatarLink: payload.avatarLink,
              nickname: payload.nickname,
              isAdmin: false
            }
            firebase.database().ref('users' + '/' + user.uid).set(userData)
              .then(() => {
                commit('setUserData', userData)
              })
              .catch(error => {
                console.log(error)
              })
          }
        )
        .catch(
          error => {
            commit('setErrorMessage', error.message)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setErrorMessage', error.message)
          }
        )
    },
    updateUserData ({commit}, payload) {
      const user = this.getters.user
      const userData = {
        avatarLink: payload.avatarLink,
        nickname: payload.nickname
      }
      firebase.database().ref('users' + '/' + user.id).set(userData)
    },
    loadRacingHistory ({commit}) {
      const user = this.getters.user
      firebase.database().ref('userHistory' + '/' + user.id).once('value')
        .then((data) => {
          const keys = []
          const obj = data.val()
          for (let key in obj) {
            if (key !== 'record') {
              keys.push({
                cpm: obj[key].cpm,
                date: obj[key].date,
                status: obj[key].status
              })
            }
          }
          commit('setRacingHistory', keys)
        })
    },
    loadTop ({commit}) {
      firebase.database().ref('top').once('value')
        .then((data) => {
          const answer = data.val()
          const values = Object.values(answer)
          if (values.length >= 10) {
            const trimmedValues = values.splice(0, 9)
            commit('setTopResults', trimmedValues)
          } else {
            commit('setTopResults', answer)
          }
        })
    },
    deleteLastRace ({commit}, payload) {
      const user = this.getters.user
      firebase.database().ref('userHistory' + '/' + user.id + '/' + payload).remove()
    },
    loadLastRaceKey ({commit}, payload) {
      const user = this.getters.user
      firebase.database().ref('userHistory' + '/' + user.id).once('value')
        .then((data) => {
          const answer = data.val()
          const array = []
          for (let key in answer) {
            if (key !== 'record') {
              array.push(key)
            }
          }
          if (array.length === 50) {
            commit('setMoreThenFiftyRaces', true)
          } else {
            commit('setMoreThenFiftyRaces', false)
          }
          commit('setLastRaceKey', array[0])
        })
    },
    countAverageSpeedAndRate ({commit}, payload) {
      const loadedRacingHistory = this.getters.getRacingHistory
      let cpmSummary = []
      let completedRaces = []
      loadedRacingHistory.forEach((item) => {
        if (item.cpm != '') {
          cpmSummary.push(item.cpm)
        }
        if (item.status === 'completed') {
          completedRaces.push(item.status)
        }
      })
      const summaryResult = (cpmSummary.reduce((a, b) => a + b, 0) / cpmSummary.length).toFixed()
      commit('setAverageSpeed', summaryResult)
      commit('setSuccessRate', ((100 / loadedRacingHistory.length) * completedRaces.length).toFixed(1))
      console.log('Done counting speed and rate!')
    },
    postRaceResult ({commit}, payload) {
      const user = this.getters.user
      const gameResults = {
        cpm: payload.cpm,
        date: payload.date.toISOString(),
        status: payload.status
      }
      firebase.database().ref('userHistory' + '/' + user.id).push(gameResults)
    },
    postInTop ({commit}, payload) {
      const user = this.getters.user
      const results = {
        averageSpeed: payload.averageSpeed,
        successRate: payload.successRate,
        nickname: payload.nickname,
        avatarLink: payload.avatarLink
      }
      firebase.database().ref('top' + '/' + user.id).set(results)
      console.log('Done posting!')
    },
    checkAndUpdateRecord ({commit}, payload) {
      const user = this.getters.user
      let record = []
      firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').once('value')
        .then((data) => {
          const answer = data.val()
          record.push(answer)
        })
        .then(() => {
          if (payload > record[0]) {
            firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').set(payload)
          }
        })
    },
    getRecord ({commit}, payload) {
      const user = this.getters.user
      firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').once('value')
        .then((data) => {
          const answer = data.val()
          commit('setRecord', answer)
        })
    },
    getAllNicknames ({commit}, payload) {
      firebase.database().ref('users').once('value')
        .then((data) => {
          const nicknames = []
          const answer = data.val()
          for (let key in answer) {
            nicknames.push(answer[key].nickname)
          }
          commit('setAllNicknames', nicknames)
        })
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    autoSetUserData ({commit}) {
      const user = this.getters.user
      firebase.database().ref('users' + '/' + user.id).once('value')
        .then((data) => {
          const answer = data.val()
          commit('setUserData', answer)
        })
    },
    clearErrorMessage ({commit}) {
      commit('clearErrorMessage', '')
    },
    logout ({commit}) {
      const userData = {
        isAdmin: false,
        avatarLink: null,
        nickname: null
      }
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setUserData', userData)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    admin (state) {
      return state.isAdmin
    },
    userData (state) {
      return {
        avatarLink: state.avatarLink,
        nickname: state.nickname
      }
    },
    loadedBookSnippet (state) {
      return state.loadedBookSnippet
    },
    getRacingHistory (state) {
      return state.loadedRacingHistory
    },
    getAverageSpeed (state) {
      return state.averageSpeed
    },
    getSuccessRate (state) {
      return state.successRate
    },
    getRecord (state) {
      return state.record
    },
    isLoaded (state) {
      return state.isLoaded
    },
    errorMessage (state) {
      return state.errorMessage
    },
    getAllNicknames (state) {
      return state.allNicknames
    },
    getLastRaceKey (state) {
      return state.lastRaceKey
    },
    getMoreThenFiftyRaces (state) {
      return state.moreThenFiftyRaces
    },
    getTopResults (state) {
      const results = state.topResults
      let resultArray = []
      for (let key in results) {
        resultArray.push({
          avatarLink: results[key].avatarLink,
          averageSpeed: results[key].averageSpeed,
          nickname: results[key].nickname,
          successRate: results[key].successRate
        })
      }
      resultArray.sort((a, b) => {
        if (a.successRate === b.successRate) {
          if (a.averageSpeed < b.averageSpeed) {
            return 1
          }
        }
        if (a.successRate < b.successRate) {
          return 1
        }
        if (a.successRate > b.successRate) {
          return -1
        }
      })
      return resultArray
    }
  }
})

