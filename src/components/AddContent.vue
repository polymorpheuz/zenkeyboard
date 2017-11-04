<template>
  <form @submit.prevent="onAddContent" class="form-wrapper">
      <h1>Add new book part</h1>
      <!--<div class="row">-->
        <!--<div class="input-field col s12">-->
          <!--<input id="author_name" type="text" v-model="authorName">-->
          <!--<label for="author_name" class="active">Author Name</label>-->
        <!--</div>-->
      <!--</div>-->
    <div class="group">
      <input type="text" required v-model="authorName">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Name</label>
    </div>
    <div class="group">
      <input type="text" required v-model="bookTitle">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Book Title</label>
    </div>
    <div class="group">
      <input type="text" required v-model="imageUrl">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Book Cover URL</label>
    </div>
    <div class="group">
      <textarea required v-model="text"></textarea>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Text</label>
    </div>
    <span class="text-length">{{ text.length }} / 400</span>
    <div class="image-preview" v-if="imageUrl">
      <img :src="imageUrl" class="image-preview" height="200"/>
    </div>
    <button class="main-button" type="submit" name="action">Send
    </button>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        authorName: '',
        bookTitle: '',
        imageUrl: '',
        text: ''
      }
    },
    computed: {
      textLength () {
        return this.text.length
      },
      formIsValid () {
        return this.authorName !== '' &&
          this.bookTitle !== '' &&
          this.imageUrl !== '' &&
          this.text !== ''
      }
    },
    methods: {
      onAddContent () {
        if (!this.formIsValid) {
          return
        }
        const bookData = {
          authorName: this.authorName,
          bookTitle: this.bookTitle,
          imageUrl: this.imageUrl,
          text: this.text
        }
        this.$store.dispatch('addContent', bookData)
        this.$router.push('/')
      }
    }
  }
</script>
<style>
  .text-length {
    margin-bottom: 20px;
  }
</style>
