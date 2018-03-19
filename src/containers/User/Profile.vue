<template>
  <div class="profile-wrapper">
    <form class="form-wrapper" @submit.prevent="updateUserData">
      <h1>Edit profile</h1>
      <VInput @updateInput="inputHandler" id="nickname" :config="nickname.config" :inputValue="nickname.value" :validationError="nickname.validationError"/>
      <VInput @updateInput="inputHandler" id="avatarLink" :config="avatarLink.config" :inputValue="avatarLink.value" />
      <div class="image-preview-wrapper">
        <img :src="userData.avatarLink" v-if="userData.avatarLink" class="image-preview" />
        <p v-if="userData.avatarLink" class="info-p">The image must be square for the best look.</p>
      </div>
      <VButton :btnDisabled="!formIsValid" type="submit">Update info</VButton>
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
      errorMessage: '',
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
          name: 'Avatar Link'
        },
        value: ''
      },
      nicknameIsTaken: false
    }
  },
  watch: {
    'nickname.value' (val, oldVal) {
      if (val.length > 0 && val !== this.$store.getters.userData.nickname) {
        this.compareNicknames()
      }
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    isAdmin () {
      return this.$store.getters.admin
    },
    allNicknames () {
      return this.$store.getters.getAllNicknames
    },
    allRequiredAreFilled () {
      return this.nickname.value !== '' && this.avatarLink.value !== ''
    },
    formIsValid () {
      return !this.nicknameIsTaken && this.allRequiredAreFilled
    }
  },
  methods: {
    getAllNicknames () {
      this.$store.dispatch('getAllNicknames')
    },
    inputValuesInit () {
      this.nickname.value = this.$store.getters.userData.nickname
      this.avatarLink.value = this.$store.getters.userData.avatarLink
    },
    inputHandler (id, value) {
      this[id].value = value
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
    },
    updateUserData () {
      const data = {
        isAdmin: this.isAdmin,
        avatarLink: this.avatarLink.value,
        nickname: this.nickname.value
      }
      this.$store.dispatch('updateUserData', data)
    }
  },
  created () {
    this.inputValuesInit()
    this.getAllNicknames()
  }
}
</script>
<style scoped>
  .profile-wrapper {
    padding-top: 50px;
  }

  .image-preview {
    display: block;
    height: 48px;
    width: 48px;
    border-radius: 100%;
    margin: 20px auto;
  }

  .info-p {
    opacity: 0.7;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 10px;
  }
</style>
