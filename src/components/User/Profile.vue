<template>
  <form class="form-wrapper" @submit.prevent="updateUserData">
    <h1>Edit profile</h1>
    <div class="group">
      <input type="text" required v-model="userData.nickname">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Nickname</label>
    </div>
    <div class="group">
      <input type="text" required v-model="userData.avatarLink">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Avatar link</label>
    </div>
    <div class="image-preview-wrapper">
      <img :src="userData.avatarLink" v-if="userData.avatarLink" class="image-preview" height="48"/>
      <span v-if="userData.avatarLink" class="info-span">It must be 48x48 for a good looking</span>
    </div>
    <button class="main-button" type="submit" name="action">Update info</button>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        errorMessage: '',
        nickname: '',
        avatarLink: ''
      }
    },
    methods: {
      updateUserData () {
        const data = {
          avatarLink: this.userData.avatarLink,
          nickname: this.userData.nickname
        }
        this.$store.dispatch('updateUserData', data)
      }
    },
    computed: {
      userData () {
        return this.$store.getters.userData
      }
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
</style>
