<template>
  <div id="app" @click="toggleDropdown">
    <div class="navi-wrapper">
      <div class="navi-container">
        <router-link to="/" tag="a" class="logo"></router-link>
        <loader v-if="loading"></loader>
        <div class="link-container" v-if="!loading">
          <router-link v-for="item in menuItems" tag="a" class="menu-link" :key="item.title" :to="item.link">{{ item.name }}</router-link>
          <a href="#" v-if="userIsAuthenticated" class="profile-button">
            <img class="profile-image" :src="userData.avatarLink" alt="">
          </a>
        </div>
      </div>
    </div>
    <div class="dropdown-menu" v-if="dropdown" @click="dropdown = !dropdown">
      <ul>
        <li><router-link to="/profile" v-if="userIsAuthenticated" class="menu-link" href="">Edit profile</router-link></li>
        <li><router-link to="/statistics" v-if="userIsAuthenticated" class="menu-link" href="">Statistics</router-link></li>
        <li><a @click.prevent="onLogout" v-if="userIsAuthenticated" class="menu-link" href="">Logout</a></li>
      </ul>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
import loader from './components/UI/loader.vue'
export default {
  components: {
    loader
  },
  data () {
    return {
      dropdown: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    },
    toggleDropdown (event) {
      if (event.target.classList[0] === 'profile-image') {
        this.dropdown = !this.dropdown
      } else {
        this.dropdown = false
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    menuItems () {
      let menuItems = [
        {name: 'Sign up', link: '/signup'},
        {name: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = []
      }
      if (this.isAdmin) {
        menuItems = [
          {name: 'Add content', link: '/addcontent'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    isAdmin () {
      return this.$store.getters.admin
    },
    userData () {
      return this.$store.getters.userData
    }
  },
  created () {
    this.$store.dispatch('setLoading', true)
  }

}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  letter-spacing: 0.02em;
}

body {
  min-height: 100vh;
  transition: all .5s;
  margin: 0;
  background: #ededed;
}

.main-button {
  background: #26a69a;
  border: none;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  outline: none;
  padding: 12px;
  width: 100%;

  &:hover {
    background: #22958a;
  }

  &:active {
    background: #1e847a;
  }
}

a {
  text-decoration: none;
}

h1 {
  font-size: 53px;
  text-align: center;
}

h4 {
  font-size: 34px;
  margin: 10px 0;
}

#app {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navi-wrapper {
  background-color: #ffffff;
  box-shadow: 0 5px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.08);
}

.navi-container {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  height: 100px;
  align-items: center;
  margin: auto;
}

.link-container {
  display: flex;
  align-items: center;
}

.profile-button {
  height: 48px;
  width: 48px;
  display: inline-block;
  overflow: hidden;
  border-radius: 100%;
  background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Funauthorized-user-icon.png?alt=media&token=9aae88a2-a8a7-4e7b-9d4e-a976e9c3b5a8') no-repeat
}

.dropdown-menu {
  position: absolute;
  background: white;
  text-align: center;
  top: 120px;
  right: 5%;
  width: 200px;
  display: inline-block;
  list-style-type: none;
  ul {
    list-style-type: none;
    padding: 0;
  }
  @media (max-width: 1200px) {
    right: 15px;
  }
}

.menu-link {
  display: inline-block;
  margin: 10px 30px;
  color: #979797;
  text-transform: uppercase;
  font-size: 16px;
  a {
    color: #2c3e50;
  }
}

.menu-link:hover {
  opacity: 0.8;
}

.logo {
  width: 57px;
  height: 58px;
  background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Flogo.png?alt=media&token=10cde347-f26f-43aa-9c6b-9d51352b26cf') no-repeat;
}

.avatar {
  width: 48px;
  height: 48px;
  display: inline-block;
  background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Favatar.png?alt=media&token=b4254af0-18c0-4327-b7df-f6a1b90fdf48') no-repeat;
}

.form-wrapper {
  width: 600px;
  background: white;
  padding: 0px 50px 35px 50px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

table {
  border-collapse:collapse;
  border-spacing: 0px;
  text-align: center;
}
.main-table {
  margin: auto;
  width: 500px;
}
th {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 12px;
  padding: 10px 10px;
}
.failed {
  background: #d9d9d9;
  opacity: 1
}
.table-cell {
  border-bottom: 1px solid #caced3;
  padding: 10px 10px;
}

a {
  color: white;
}

.group {
  position:relative;
  width: 500px;
  margin-bottom:2em;
}
input, textarea {
  font-family: 'Roboto Slab', serif;
  font-size:16px;
  font-weight: 300;
  /*padding:0.625em  0.625em 0.625em 0.3125em;*/
  padding: 10px 0;
  display:block;
  width: 100%;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus, textarea:focus {
  outline:none;
}

label {
  color:#999;
  font-size:15px;
  position:absolute;
  pointer-events:none;
  left:0.3125em;
  top: 15px;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label, textarea:focus ~ label, textarea:valid ~ label 		{
  top:-15px;
  left: -2px;
  font-size: 12px;
  color: #26a69a;
}

.bar 	{
  position:relative;
  display:block;
}

.bar:before, .bar:after 	{
  content:'';
  height:2px;
  width:0;
  bottom:0px;
  position:absolute;
  background: #26a69a;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%;
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after, textarea:focus ~ .bar:before, textarea:focus ~ .bar:after {
  width:50%;
}

.image-preview {
  margin: 20px 0;
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

[v-cloak] {
  display: none;
}

</style>
