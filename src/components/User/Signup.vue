<template>
  <form @submit.prevent="onSignup" class="form-wrapper">
      <h1>Sign up</h1>
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
    <div class="group">
      <input type="password" required v-model="confirmPassword">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Confirm Password</label>
      <span class="input-alert-message" v-if="!passwordMatch">Passwords doesn't match</span>
    </div>
    <div class="group">
      <input type="text" required v-model="nickname">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Enter nickname</label>
      <span class="input-alert-message" v-if="nicknameIsTaken">This nickname is taken</span>
    </div>
    <div class="group">
      <input type="text" v-model="avatarLink">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Avatar link</label>
    </div>
    <div class="image-preview-wrapper">
      <img :src="avatarLink" v-if="avatarLink" class="image-preview" height="48" width="48"/>
      <span v-if="avatarLink" class="info-span">It must be 48x48 for a good looking</span>
    </div>
      <button class="main-button" type="submit" name="action">Sign up
      </button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        avatarLink: '',
        nickname: '',
        passwordMatch: true,
        nicknameIsTaken: false
      }
    },
    computed: {
      user (value) {
        return this.$store.getters.user
      },
      errorMessage () {
        return this.$store.getters.errorMessage
      },
      allNicknames () {
        return this.$store.getters.getAllNicknames
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      },
      confirmPassword () {
        if (this.confirmPassword.length > 0) {
          this.comparePasswords()
        }
      },
      nickname () {
        if (this.nickname.length > 0) {
          this.compareNicknames()
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password, nickname: this.nickname, avatarLink: this.avatarLink})
      },
      getAllNicknames () {
        this.$store.dispatch('getAllNicknames')
      },
      comparePasswords () {
        this.password === this.confirmPassword ? this.passwordMatch = true : this.passwordMatch = false
      },
      compareNicknames () {
        this.nicknameIsTaken = false
        this.allNicknames.forEach((i) => {
          if (this.nickname.toUpperCase() === i.toUpperCase()) {
            this.nicknameIsTaken = true
          }
        })
      }
    },
    created () {
      this.getAllNicknames()
    },
    destroyed () {
      this.$store.dispatch('clearErrorMessage')
    }
  }
</script>

<style>
  .image-preview {
    display: block;
    border-radius: 100%;
    margin: 20px auto;
  }
  .info-span {
    opacity: 0.7;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 10px;
  }
  .main-button {
    margin: 20px auto;
  }
  .input-alert-message {
    text-align: left;
    color: red;
    font-size: 12px;
  }
</style>
