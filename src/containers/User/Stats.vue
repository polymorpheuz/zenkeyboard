<template>
  <div class="stat-wrapper">
    <div class="stat-container">
      <div class="top-line">
        <div class="top-number-wrapper">
          <span class="top-number">{{ record }} cpm</span>
          <span class="top-number-description">Record</span>
        </div>
        <div class="top-number-wrapper">
          <span class="top-number">{{ averageSpeed}} cpm</span>
          <span class="top-number-description">Average speed</span>
        </div>
        <div class="top-number-wrapper">
          <span class="top-number">{{ successRate }} %</span>
          <span class="top-number-description">Success rate</span>
        </div>
      </div>
      <table v-show="racingHistory.length > 0" class="main-table">
        <tr><th>Characters per minute</th><th>Date</th></tr>
        <tr class="table-row" v-for="(item, index) in racingHistory" :class="item.status" :key="item + item.status + index">
          <td class="table-cell" :class="item.status">{{ item.cpm }}</td>
          <td class="table-cell">{{ item.date | date }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      loadRacingHistory (invocationContext) {
        this.$store.dispatch('loadRacingHistory', invocationContext)
      },
      countAverageSpeedAndRate () {
        this.$store.dispatch('countAverageSpeedAndRate')
      },
      getRecord () {
        this.$store.dispatch('getRecord')
      }
    },
    watch: {
      racingHistory () {
        this.getRecord()
        this.countAverageSpeedAndRate()
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      racingHistory () {
        return this.$store.getters.getRacingHistory
      },
      averageSpeed () {
        return this.$store.getters.getAverageSpeed
      },
      successRate () {
        return this.$store.getters.getSuccessRate
      },
      record () {
        return this.$store.getters.getRecord
      }
    },
    created () {
      this.loadRacingHistory('stat')
    }
  }
</script>

<style scoped>
  .stat-wrapper {
    padding: 40px 0;
  }

  .stat-container {
    width: 600px;
    margin: auto;
    padding: 50px;
    background: white;
    border: 1px solid #cacaca;
  }

  .top-line {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  .top-number {
    display: block;
    font-size: 18px;
  }

  .top-number-description {
    text-transform: uppercase;
    font-size: 12px;
  }
</style>
