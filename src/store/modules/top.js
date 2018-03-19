import * as firebase from 'firebase'

const state = {
  topResults: []
}

const getters = {
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
      // If success rate is equal return the user that has higher average speed
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
    const trimmedResults = resultArray.slice(0, 9)
    return trimmedResults
  }
}

const actions = {
  loadTop ({commit}) {
    firebase.database().ref('top').once('value')
      .then((data) => {
        const answer = data.val()
        commit('setTopResults', answer)
      })
  }
}

const mutations = {
  setTopResults (state, payload) {
    state.topResults = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
