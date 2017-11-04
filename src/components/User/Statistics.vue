<template>
  <div class="stat-wrapper">
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
    <table class="main-table">
      <tr><th>Characters per minute</th><th>Date</th></tr>
      <tr v-for="item in loadedRacingHistory" :class="item.status"><td class="table-cell" :class="item.status">{{ item.cpm }}</td><td class="table-cell">{{ item.date | date }}</td></tr>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
//        averageSpeed: '',
//        successRate: ''
      }
    },
    methods: {
      loadRacingHistory () {
        this.$store.dispatch('loadRacingHistory')
      },
      countAverageSpeedAndRate () {
//        let cpmSummary = []
//        this.loadedRacingHistory.forEach((item) => {
//          if (item.cpm != '') {
//            cpmSummary.push(item.cpm)
//          }
//        })
//        const summaryResult = (cpmSummary.reduce((a, b) => a + b, 0) / cpmSummary.length).toFixed()
//        this.averageSpeed = summaryResult
//        this.successRate = cpmSummary.length * 2
        this.$store.dispatch('countAverageSpeedAndRate')
      },
      getRecord () {
        this.$store.dispatch('getRecord')
      }
    },
    watch: {
      user () {
        this.loadRacingHistory()
      },
      loadedRacingHistory () {
        this.countAverageSpeedAndRate()
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loadedRacingHistory () {
        const history = this.$store.getters.getRacingHistory
        return history.reverse()
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
      this.loadRacingHistory()
      this.getRecord()
      this.$store.dispatch('deleteLastRace')
    }
  }
</script>
<style>
  .top-line {
    display: flex;
    justify-content: space-around;
    width: 600px;
    margin: auto;
  }
  .stat-wrapper {
    /*padding: 30px 200px;*/
    width: 600px;
    margin: 50px auto;
    padding: 45px 0;
    font-weight: 300;
    background: white;
  }
  .top-line {
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
