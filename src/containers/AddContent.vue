<template>
  <div class="add-content-wrapper">
    <form @submit.prevent="onAddContent" class="form-wrapper">
      <h1>Add new book part</h1>
      <VInput @updateInput="inputHandler" id="authorName" :config="authorName.config" :inputValue="authorName.value" />
      <VInput @updateInput="inputHandler" id="bookTitle" :config="bookTitle.config" :inputValue="bookTitle.value" />
      <VInput @updateInput="inputHandler" id="imageUrl" :config="imageUrl.config" :inputValue="imageUrl.value" />
      <VInput @updateInput="inputHandler" id="text" :config="text.config" :inputValue="text.value" />
      <span class="text-length">{{ text.value.length }} / 400</span>
      <div v-if="imageUrl.value" class="image-preview-wrapper">
        <img :src="imageUrl.value" class="image-preview" />
      </div>
      <VButton type="submit">Send</VButton>
    </form>
  </div>
</template>
<script>
import VButton from '../components/UI/VButton.vue'
import VInput from '../components/UI/VInput.vue'
export default {
  components: {
    VButton,
    VInput
  },
  data () {
    return {
      authorName: {
        config: {
          type: 'text',
          elementType: 'input',
          name: 'Author Name'
        },
        value: ''
      },
      bookTitle: {
        config: {
          type: 'text',
          elementType: 'input',
          name: 'Book Title'
        },
        value: ''
      },
      imageUrl: {
        config: {
          type: 'text',
          elementType: 'input',
          name: 'Image URL'
        },
        value: ''
      },
      text: {
        config: {
          type: 'text',
          elementType: 'textarea',
          name: 'Text'
        },
        value: ''
      }
    }
  },
  computed: {
    textLength () {
      return this.text.value.length
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
        authorName: this.authorName.value,
        bookTitle: this.bookTitle.value,
        imageUrl: this.imageUrl,
        text: this.text
      }
      this.$store.dispatch('addContent', bookData)
      this.$router.push('/')
    },
    inputHandler (id, value) {
      this[id].value = value
    }
  }
}
</script>
<style scoped>
  .add-content-wrapper {
    padding-top: 50px;
  }

  .image-preview {
    height: 200px;
  }
  
  .image-preview-wrapper{
    margin-bottom: 20px;
  }

  .text-length {
    margin-bottom: 20px;
  }
</style>
