<template>
  <div id="app" @click="toggleDropdown" class="app" :class="{ 'mistaken-parent': isMistaken }">
    <div class="content">
      <TheHeader :dropdown="dropdown" />
      <VLoader v-if="loading"></VLoader>
      <router-view v-if="!loading"></router-view>
    </div>
    <div class="message">
      <div class="message-wrapper">
        <p>This app is not intended to be used on this resolution because it's desktop keyboard trainer. Use any non mobile device to see what's it about, please.</p>
      </div>
    </div>
  </div>
</template>

<script>
import VLoader from './components/UI/VLoader.vue'
import VButton from './components/UI/VButton.vue'
import TheHeader from './components/TheHeader.vue'
export default {
  components: {
    VLoader,
    VButton,
    TheHeader
  },
  data () {
    return {
      dropdown: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/signin')
    },
    toggleDropdown (event) {
      if (event.target.classList[0] === 'profile-button') {
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
    isMistaken () {
      return this.$store.getters.isMistaken
    }
  },
  created () {
    this.$store.dispatch('setLoading', true)
  }

}
</script>

<style>
@import './base/normalize.css';

* {
  box-sizing: border-box;
}

body {
  background: #ededed;
  color: #2c3e50;
  letter-spacing: 0.02em;
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

/*Local styles*/

.app {
  min-height: 100vh;
  transition: background-color .1s ease;
}

.mistaken-parent {
  background-color: #ce8287;
}

@media(max-width: 660px) {
  .content {
    display: none;
  }
}

.message {
  padding: 30px;
  display: none;
  font-size: 24px;
}

@media(max-width: 660px) {
  .message {
    display: block
  }
}

.message-wrapper {
  background: #fff;
  border: 1px solid #cacaca;
  padding: 20px;
  text-align: center;
}

/* Global styles */

.wrapper {
  max-width: 1140px;
  height: 100%;
  width: 100%;
  margin: 0px auto;
}

/* Global form styles */

.form-wrapper {
  width: 600px;
  background: white;
  border: 1px solid #cacaca;
  padding: 0px 50px 35px 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

/* Global table styling */

.main-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  text-align: center;
}

.table-header {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 12px;
  padding: 10px 10px;
}

.table-row {
  border-bottom: 1px solid #caced3;
}

.table-cell {
  padding: 10px 10px;
}

.failed {
  background: #d9d9d9;
  opacity: 1
}

</style>
