import * as firebase from 'firebase'

const state = {
  user: null,
  avatarLink: '',
  nickname: '',
  isAdmin: false,
  errorMessage: '',
  allNicknames: []
}

const getters = {
  errorMessage: state => state.errorMessage,
  admin: state => state.isAdmin,
  getAllNicknames: state => state.allNicknames,
  user: state => state.user,
  userData (state) {
    return {
      avatarLink: state.avatarLink,
      nickname: state.nickname
    }
  }
}

const actions = {
  signUserUp ({commit}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
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
      })
      .catch(error => {
        commit('setErrorMessage', error.message)
      })
  },

  signUserIn ({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
        this.$router.push('/')
      })
      .catch(error => {
        commit('setErrorMessage', error.message)
      })
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
  },

  updateUserData ({commit}, payload) {
    const user = this.getters.user
    const userData = {
      avatarLink: payload.avatarLink,
      nickname: payload.nickname,
      isAdmin: payload.isAdmin
    }
    firebase.database().ref('users' + '/' + user.id).update(userData)
    commit('setUserData', userData)
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
    if (payload) {
      commit('setLoading', true)
    }
    commit('setUser', {id: payload.uid})
  },

  autoSetUserData ({commit}) {
    const user = this.getters.user
    firebase.database().ref('users' + '/' + user.id).once('value')
      .then((data) => {
        const answer = data.val()
        commit('setUserData', answer)
      })
      .then(() => {
        commit('setLoading', false)
      })
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },

  setUserData (state, payload) {
    state.isAdmin = payload.isAdmin
    state.avatarLink = payload.avatarLink
    state.nickname = payload.nickname
  },

  setAllNicknames (state, payload) {
    state.allNicknames = payload
  },

  setErrorMessage (state, payload) {
    state.errorMessage = payload
  },

  clearErrorMessage (state, payload) {
    state.errorMessage = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
