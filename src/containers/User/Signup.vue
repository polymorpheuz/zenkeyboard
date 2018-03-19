<template>
  <div class="signup-wrapper">
    <form @submit.prevent="onSignup" class="form-wrapper">
      <h1>Sign up</h1>
      <span v-if="errorMessage" class="alert-message">{{ errorMessage }}</span>
      <VInput @updateInput="inputHandler" id="email" :config="email.config" :inputValue="email.value"/>
      <VInput @updateInput="inputHandler" id="password" :config="password.config" :inputValue="password.value"/>
      <VInput @updateInput="inputHandler" id="confirmPassword" :config="confirmPassword.config" :inputValue="confirmPassword.value" :validationError="confirmPassword.validationError"/>
      <VInput @updateInput="inputHandler" id="nickname" :config="nickname.config" :inputValue="nickname.value" :validationError="nickname.validationError"/>
      <VInput @updateInput="inputHandler" id="avatarLink" :config="avatarLink.config" :inputValue="avatarLink.value"/> 
      <div class="image-preview-wrapper">
        <img v-if="avatarLink.value" class="image-preview" :src="avatarLink.value" height="48" width="48"/>
        <span v-if="avatarLink.value" class="info-span">The image must be square for the best look.</span>
      </div>
      <VButton :btnDisabled="!formIsValid" type="submit">Sign up</VButton>
    </form>
  </div>

</template>

<script>
  import VButton from '../../components/UI/VButton.vue'
  import VInput from '../../components/UI/VInput.vue'
  export default {
    components: {
      VButton,
      VInput
    },
    data () {
      return {
        email: {
          config: {
            type: 'text',
            elementType: 'input',
            name: 'Email'
          },
          value: ''
        },
        password: {
          config: {
            type: 'password',
            elementType: 'input',
            name: 'Password'
          },
          value: ''
        },
        confirmPassword: {
          config: {
            type: 'password',
            elementType: 'input',
            name: 'Confirm Password'
          },
          validationError: '',
          value: ''
        },
        nickname: {
          config: {
            type: 'text',
            elementType: 'input',
            name: 'Nickname'
          },
          validationError: '',
          value: ''
        },
        avatarLink: {
          config: {
            type: 'text',
            elementType: 'input',
            name: 'Avatar URL'
          },
          value: ''
        },
        passwordMatch: false,
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
      },
      allRequiredAreFilled () {
        return this.email.value !== '' &&
               this.password.value !== '' &&
               this.confirmPassword.value !== '' &&
               this.nickname.value !== '' &&
               this.avatarLink.value !== ''
      },
      formIsValid () {
        return this.passwordMatch && !this.nicknameIsTaken && this.allRequiredAreFilled
      }
    },
    watch: {
      'confirmPassword.value' (val) {
        if (val.length > 0) {
          this.comparePasswords()
        }
      },
      'nickname.value' (val, oldVal) {
        if (val.length > 0) {
          this.compareNicknames()
        }
      }
    },
    methods: {
      onSignup () {
        const payload = {
          email: this.email,
          password: this.password,
          nickname: this.nickname,
          avatarLink: this.avatarLink
        }
        this.$store.dispatch('signUserUp', payload)
      },
      inputHandler (id, value) {
        this[id].value = value
      },
      getAllNicknames () {
        this.$store.dispatch('getAllNicknames')
      },
      comparePasswords () {
        if (this.password.value === this.confirmPassword.value) {
          this.passwordMatch = true
          this.confirmPassword.validationError = ''
        } else {
          this.passwordMatch = false
          this.confirmPassword.validationError = "Password doesn't match"
        }
      },
      compareNicknames () {
        this.nicknameIsTaken = false
        this.nickname.validationError = ''
        this.allNicknames.forEach((i) => {
          if (this.nickname.value.toUpperCase() === i.toUpperCase()) {
            this.nicknameIsTaken = true
            this.nickname.validationError = 'This nickname is already taken'
          }
        })
      }
    },
    created () {
      this.getAllNicknames()
    },
    mounted () {
      this.user && this.$router.push('/')
    },
    destroyed () {
      this.$store.commit('clearErrorMessage')
    }
  }
</script>

<style scoped>
  .signup-wrapper {
    padding-top: 50px;
  }

  .image-preview {
    display: block;
    height: 48px;
    width: 48px;
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
