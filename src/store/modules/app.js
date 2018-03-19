const state = {
  loading: true
}

const getters = {
  loading: state => state.loading
}

const mutations = {
  setLoading (state, payload) {
    state.loading = payload
  }
}

const actions = {
  setLoading ({commit}, payload) {
    commit('setLoading', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
