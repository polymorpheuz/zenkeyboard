<template>
  <form @submit.prevent="onSignin" class="form-wrapper">
      <h1>Sign in</h1>
      <span v-if="errorMessage" class="alert-message">{{ errorMessage }}</span>
      <div class="group">
        <input type="text" required v-model="email">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Email</label>
      </div>
      <div class="group">
        <input type="password" required v-model="password">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <button class="main-button" type="submit" name="action">Sign in
      </button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      errorMessage () {
        return this.$store.getters.errorMessage
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      }
    },
    destroyed () {
      this.$store.dispatch('clearErrorMessage')
    }
  }
</script>
