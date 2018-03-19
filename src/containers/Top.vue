<template>
  <div class="top-wrapper">
    <div class="top-container">
      <table class="main-table">
        <tr class="table-row">
          <th class="table-header">№</th>
          <th class="table-header">Nickname</th>
          <th class="table-header">Average speed</th>
          <th class="table-header">Success rate</th>
        </tr>
        <tr class="table-row" v-for="(value, index) in topResults" :key="value + index">
          <td class="table-cell">{{ index + 1 }}.</td>
          <td class="table-cell">
            <img class="table-avatar" :src="value.avatarLink" />
            {{ value.nickname }}
          </td>
          <td class="table-cell">{{ value.averageSpeed }}</td>
          <td class="table-cell">{{ value.successRate }}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
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
<style scoped>
  .top-wrapper {
    padding-top: 50px;
  }

  .top-container {
    width: 600px;
    margin: auto;
    padding: 50px;
    background: white;
    border: 1px solid #cacaca;
  }

  .table-avatar {
    background: gray;
    height: 20px;
    width: 20px;
  }
</style>
