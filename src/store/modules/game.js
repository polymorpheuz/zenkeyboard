import * as firebase from 'firebase'

const state = {
  loadedBookSnippet: '',
  loadedRacingHistory: [],
  isMistaken: false,
  successRate: '',
  averageSpeed: '',
  record: '',
  moreThenFiftyRaces: false
}

const getters = {
  getMoreThenFiftyRaces: state => state.moreThenFiftyRaces,
  loadedBookSnippet: state => state.loadedBookSnippet,
  getRacingHistory: state => state.loadedRacingHistory,
  getAverageSpeed: state => state.averageSpeed,
  getSuccessRate: state => state.successRate,
  getRecord: state => state.record,
  isMistaken: state => state.isMistaken
}

const actions = {
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
      })
  },

  loadRacingHistory ({commit}, payload) {
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
        // To see them in right order on Stat page
        keys.reverse()
        commit('setMoreThenFiftyRaces', keys.length > 50)
        const trimmedKeys = payload === 'stat' ? keys.slice(0, 49) : keys.slice(0, 48)
        commit('setRacingHistory', trimmedKeys)
      })
  },

  countAverageSpeedAndRate ({commit}, payload) {
    const loadedRacingHistory = this.getters.getRacingHistory
    let cpmSummary = []
    let completedRaces = []
    loadedRacingHistory.forEach((item) => {
      // If race is completed (failed races don't have the cpm key)
      if (item.cpm) {
        cpmSummary.push(item.cpm)
        completedRaces.push(item.status)
      }
    })
    const summaryResult = (cpmSummary.reduce((a, b) => a + b, 0) / cpmSummary.length).toFixed()
    const successRate = ((100 / loadedRacingHistory.length) * completedRaces.length).toFixed(1)
    commit('setAverageSpeed', summaryResult === 'NaN' ? 0 : summaryResult)
    commit('setSuccessRate', successRate === 'NaN' ? 0 : successRate)
  },

  getRecord ({commit}, payload) {
    const user = this.getters.user
    firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').once('value')
        .then((data) => {
          const answer = data.val()
          commit('setRecord', !answer ? 0 : answer)
        })
  },

  checkAndUpdateRecord ({commit}, payload) {
    const user = this.getters.user
    let record = null
    firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').once('value')
      .then((data) => {
        const answer = data.val()
        record = answer
      })
      .then(() => {
        if (payload > record) {
          firebase.database().ref('userHistory' + '/' + user.id + '/' + 'record').set(payload)
        }
      })
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
  }
}

const mutations = {
  setLoadedBookSnippet (state, payload) {
    state.loadedBookSnippet = payload
  },

  setRacingHistory (state, payload) {
    state.loadedRacingHistory = payload
  },

  pushToRacingHistory (state, payload) {
    state.loadedRacingHistory.push(payload)
  },

  setMoreThenFiftyRaces (state, payload) {
    state.moreThenFiftyRaces = payload
  },

  setMistaken (state, payload) {
    state.isMistaken = payload
  },

  setAverageSpeed (state, payload) {
    state.averageSpeed = payload
  },

  setSuccessRate (state, payload) {
    state.successRate = payload
  },

  setRecord (state, payload) {
    state.record = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
