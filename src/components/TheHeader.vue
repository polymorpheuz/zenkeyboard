<template>
  <header class="header">
    <div class="wrapper header-container">
      <router-link to="/" tag="a" class="logo" exact-active-class=""></router-link>
      <div class="link-container">
        <router-link v-for="item in menuItems" tag="a" class="menu-link" :key="item.title" :to="item.link">{{ item.name }}</router-link>
        <div class="profile-button-wrapper">
          <img class="profile-button" v-if="userIsAuthenticated" :src="userData.avatarLink" alt="">
          <ul class="dropdown-menu" v-if="dropdown">
            <li><router-link to="/profile" v-if="userIsAuthenticated" class="menu-link" href="">Profile</router-link></li>
            <li><router-link to="/stats" v-if="userIsAuthenticated" class="menu-link" href="">Statistics</router-link></li>
            <li><a @click.prevent="onLogout" v-if="userIsAuthenticated" class="menu-link" href="">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        gameIsFailed: false
      }
    },
    props: ['dropdown'],
    computed: {
      isAdmin () {
        return this.$store.getters.admin
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
      userData () {
        return this.$store.getters.userData
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    },
    created () {
    }
  }
</script>

<style scoped>
.header {
  height: 100px;
  background-color: #ffffff;
  border-bottom: 1px solid #cacaca;
}

.header-container {
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  align-items: center;
}

.link-container {
  display: flex;
  align-items: center;
}

.profile-button-wrapper {
  position: relative;
  margin-left: 30px;
}

.profile-button {
  height: 48px;
  width: 48px;
  overflow: hidden;
  border-radius: 100%;
  background: url('../assets/unauthorized-user-icon.png') no-repeat
}

.dropdown-menu {
  position: absolute;
  background: white;
  text-align: center;
  top: 70px;
  left: -45px;
  padding: 5px 0;
  display: inline-block;
  list-style-type: none;
  border: 1px solid #cacaca;
}

.menu-link {
  display: inline-block;
  margin: 10px 20px;
  color: #979797;
  text-transform: uppercase;
  font-size: 16px;
}

.menu-link:hover {
  color:#42aaa0;
}

.router-link-exact-active {
  color: black;
}

.logo {
  width: 58px;
  height: 50px;
  background: url('../assets/logo.svg') no-repeat;
}

</style>
