<template>
  <div class="main-wrapper" :class="{ mistaken: isMistaken }">
    <div class="game-wrapper" v-if="!gameIsOver">
      <div class="text-wrapper" v-if="!gameIsPreparing">
        <span class="before-highlight">{{ textSpan.beforeHighlight }}</span>
        <span class="highlighted">{{ textSpan.highlighted }}</span>
        <span class="after-highlight">{{ textSpan.afterHighlight }}</span>
      </div>
      <input id="mainInput" v-focus v-if="!gameIsPreparing" class="game-input" type="text" v-model="inputValue">
    </div>
    <div class="timer" :class="{ puffer: isPuffing }" v-if="gameIsPreparing">{{ timer }}</div>
    <div class="results" v-show="gameIsCompleted">
      <img :src="loadedBookSnippet.imageUrl" height="550">
      <div class="results-info">
        <h1 class="book-title">{{ loadedBookSnippet.bookTitle }}</h1>
        <h2 class="by-author">by {{ loadedBookSnippet.authorName}}</h2>
        <p>
          Your speed: {{ cpm }} cpm
        </p>
        <p>
          Your time: {{ time.raceResult }} sec
        </p>
        <router-link to="/" tag="a"><a class="main-button">Back to menu</a></router-link>
      </div>
    </div>
    <div class="results" v-show="gameIsFailed">
      <img :src="loadedBookSnippet.imageUrl" height="550">
      <div class="results-info">
        <h1 class="book-title">{{ loadedBookSnippet.bookTitle }}</h1>
        <h2 class="by-author">by {{ loadedBookSnippet.authorName}}</h2>
        <h3>You have failed!</h3>
        <router-link to="/" tag="a"><a class="main-button">Back to menu</a></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  //  import { debounce } from 'lodash'
  export default {
    data () {
      return {
        text: "If you didn't have a death sentence, he decided, then prison was, at best, only a temporary reprieve from life, for two reasons.",
        textArray: [],
        textSpan: {
          beforeHighlight: '',
          highlighted: '',
          afterHighlight: ''
        },
        timer: '6',
        isPuffing: false,
        inputValue: "",
        userMistakes: [],
        time: {
          start: null,
          finish: '',
          raceResult: ''
        },
        cpm: '360',
        isMistaken: false,
        gameIsPreparing: true,
        gameIsOver: false,
        gameIsCompleted: false,
        gameIsFailed: false
      }
    },
    watch: {
      inputValue () {
        this.compareByCharacters()
        if (this.inputValue === this.textSpan.highlighted) {
          this.moveHighlighted()
          this.inputValue = ''
        }
      }
    },
    computed: {
      userData () {
        return this.$store.getters.userData
      },
      loadedBookSnippet () {
        return this.$store.getters.loadedBookSnippet
      },
      loadedRacingHistory () {
        const history = this.$store.getters.getRacingHistory
//        history.pop()
        return history
      },
      averageSpeed () {
        return this.$store.getters.getAverageSpeed
      },
      successRate () {
        return this.$store.getters.getSuccessRate
      },
      isLoaded () {
        return this.$store.getters.isLoaded
      },
      wordMatch () {
        return this.inputValue === this.textSpan.highlighted
      },
      lastRaceKey () {
        return this.$store.getters.getLastRaceKey
      },
      moreThenFiftyRaces () {
        return this.$store.getters.getMoreThenFiftyRaces
      }
    },
    methods: {
      recursiveTimer () {
        if (this.timer === 1) {
          // Here is where all starts
          this.gameIsPreparing = false
          this.stringToArray()
          this.addSpaces()
          this.startInit()
          this.checkAndUpdateRecord()
          this.time.start = new Date()
          return
        }
        this.timer = this.timer - 1
        this.isPuffing = false
        setTimeout(() => {
          this.isPuffing = true
        }, 500)
        setTimeout(this.recursiveTimer, 1000)
      },
      addSpaces () {
        let lastItem = this.textArray[this.textArray.length - 1]
        let result = []
        this.textArray.forEach(function (item) {
          if (lastItem !== item) {
            item = item.concat(' ')
          }
          result.push(item)
        })
        this.textArray = result
      },
      stringToArray () {
        this.text = this.loadedBookSnippet.text
        this.textArray = this.text.split(' ')
      },
      toggleLoaded () {
        this.$store.commit('toggleLoaded')
      },
      startInit () {
        this.textSpan.highlighted = this.textArray[0]
        this.textArray.splice(0, 1)
        this.textSpan.afterHighlight = this.textArray.join('')
      },
      getBookSnippet () {
        this.$store.dispatch('getBookSnippet')
      },
      loadRacingHistory () {
        this.$store.dispatch('loadRacingHistory', true)
      },
      moveHighlighted () {
        // If text array is empty - user has succeeded
        if (this.textArray.length === 0) {
          this.finishCompletedGame()
        } else {
          // Move highlighted in before
          this.textSpan.beforeHighlight = this.textSpan.beforeHighlight.concat(this.textSpan.highlighted)
          // Reinitialize highlighted
          this.textSpan.highlighted = this.textArray[0]
          // Delete highlighted from array
          this.textArray.splice(0, 1)
          // Update text after highlighted
          this.textSpan.afterHighlight = this.textArray.join('')
        }
      },
      compareByCharacters () {
        let falseCollector = []
        for (let i = 0; i < this.inputValue.length; i++) {
          let characterComparison = this.inputValue[i] === this.textSpan.highlighted[i]
          // Push false in falseCollector if letter doesn't match the letter in input
          if (!characterComparison) {
            falseCollector.push(characterComparison)
          }
        }
        // If there is any ammount of character discrepancies and mistaken value is not false - push and make it false
        if (falseCollector.length > 0 && !this.isMistaken) {
          this.userMistakes.push('mistake')
          this.isMistaken = true
        }
        // If there isn't any discrepancies - make mistaken value true
        if (falseCollector.length === 0) {
          this.isMistaken = false
        }
        if (this.userMistakes.length > 2) {
          this.finishFailedGame()
        }
      },
      calculateTimeAndCpm () {
        this.time.raceResult = ((this.time.finish.getTime() - this.time.start.getTime()) / 1000).toFixed(1)
        this.cpm = Math.round((this.text.length / this.time.raceResult) * 60)
      },
      deleteLastRace () {
        this.$store.dispatch('deleteLastRace', this.lastRaceKey)
      },
      loadLastRaceKey () {
        this.$store.dispatch('loadLastRaceKey')
      },
      countAverageSpeedAndRate () {
        this.$store.dispatch('countAverageSpeedAndRate')
      },
      postRaceResult (completed) {
        let gameResult = null
        if (completed) {
          gameResult = {
            cpm: this.cpm,
            date: new Date(),
            status: 'completed'
          }
        } else {
          gameResult = {
            cpm: '',
            date: new Date(),
            status: 'failed'
          }
        }
        this.$store.dispatch('postRaceResult', gameResult)
      },
      postInTop () {
        const results = {
          averageSpeed: this.averageSpeed,
          successRate: this.successRate,
          nickname: this.userData.nickname,
          avatarLink: this.userData.avatarLink
        }
        this.$store.dispatch('postInTop', results)
      },
      finishCompletedGame () {
        this.time.finish = new Date()
        this.calculateTimeAndCpm()
        this.postRaceResult(true)
        this.checkAndUpdateRecord()
        this.gameIsOver = true
        this.gameIsCompleted = true
        this.loadRacingHistory()
        this.countAverageSpeedAndRate()
        if (this.moreThenFiftyRaces) {
          this.deleteLastRace()
          this.postInTop()
        }
      },
      finishFailedGame () {
        this.postRaceResult(false)
        this.isMistaken = false
        this.gameIsOver = true
        this.gameIsFailed = true
        this.loadRacingHistory()
        this.countAverageSpeedAndRate()
        if (this.moreThenFiftyRaces) {
          this.deleteLastRace()
          this.postInTop()
        }
      },
      checkAndUpdateRecord () {
        this.$store.dispatch('checkAndUpdateRecord', this.cpm)
      }
    },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    },
    created () {
      this.getBookSnippet()
      this.loadLastRaceKey()
    },
    mounted () {
      this.recursiveTimer()
    },
    destroyed () {
      this.toggleLoaded()
    }
  }
</script>

<style>
  .main-wrapper {
    font-weight: 300;
    font-size: 28px;
    height: 100vh;
    padding: 80px 0;
    overflow: hidden;
  }

  .game-wrapper {
    width: 800px;
    margin: auto;
  }

  .text-wrapper {
    background: white;
    padding: 30px;
  }

  .timer {
    font-size: 96px;
    margin-top: 100px;
    text-align: center;
  }

  .puffer {
    opacity: 0;
    transform: scale(1.6,1.6);
    transition: all 0.4s ease-out;
  }

  .game-input {
    margin-top: 30px;
    padding-left: 15px;
    border: none;
  }

  .results {
    display: flex;
    margin: auto;
    width: 60%;
    background: white;
    text-align: center;
  }

  .results-info {
    width: 100%;
  }

  .book-title {
    font-weight: 700;
    margin: 30px 0 5px 0;
  }

  .by-author {
    font-weight: 400;
    color: #c5c5c5;
    font-size: 30px;
    margin: 0;
  }

  .mistaken {
    background: #ce8287;
    color: white;
  }

  .start-wrapper {
    width: 500px;
    text-align: center;
    margin: auto;
  }

  .before-highlight {
    opacity: 0.2;
  }

  .highlighted {
    color: #26a69a;
  }

  .hidden {
    display: none;
  }
</style>
