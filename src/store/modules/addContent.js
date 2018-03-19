import * as firebase from 'firebase'

const actions = {
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
  }
}

export default {
  actions
}
