<template>
  <div class="signin-wrapper">
    <form @submit.prevent="onSignin" class="form-wrapper">
        <h1>Sign in</h1>
        <span v-if="errorMessage" class="alert-message">{{ errorMessage }}</span>
        <VInput @updateInput="inputHandler" id="email" :config="email.config" :inputValue="email.value"/>
        <VInput @updateInput="inputHandler" id="password" :config="password.config" :inputValue="password.value" />
        <VButton type="submit">Sign in</VButton>
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
        }
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
    methods: {
      onSignin () {
        const payload = {
          email: this.email.value,
          password: this.password.value
        }
        this.$store.dispatch('signUserIn', payload)
      },
      inputHandler (id, value) {
        this[id].value = value
      }
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
  .signin-wrapper {
    padding-top: 50px;
  }

  .alert-message {
      display: block;
      background: #ff4d57;
      font-size: 14px;
      color: white;
      margin-bottom: 40px;
      padding: 20px;
      width: 100%;
      height: 100%;
      text-align: left;
  }
</style>
