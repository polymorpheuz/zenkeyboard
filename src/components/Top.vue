<template>
  <div class="top-wrapper">
    <table class="main-table">
      <tr><th>№</th><th>Nickname</th><th>Average speed</th><th>Success rate</th></tr>
      <tr v-for="(value, index) in topResults"><td class="table-cell">{{ index + 1 }}.</td><td class="table-cell"><img :src="value.avatarLink" height="20"> {{ value.nickname }}</td><td class="table-cell">{{ value.averageSpeed }}</td><td class="table-cell">{{ value.successRate}}%</td></tr>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        something: 'its'
      }
    },
    computed: {
      topResults () {
        return this.$store.getters.getTopResults
      }
    },
    methods: {
      loadTop () {
        this.$store.dispatch('loadTop')
      }
    },
    created () {
      this.loadTop()
    }
  }
</script>
<style>
  .top-wrapper {
    width: 600px;
    margin: 50px auto;
    padding: 45px 0;
    font-weight: 300;
    background: white;
  }
</style>
