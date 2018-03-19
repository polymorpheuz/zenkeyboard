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
    <div class="results" v-show="gameIsOver">
      <img class="results-img" :src="loadedBookSnippet.imageUrl" height="550" />
      <div class="results-info">
        <h1 class="book-title">{{ loadedBookSnippet.bookTitle }}</h1>
        <h2 class="by-author">by {{ loadedBookSnippet.authorName}}</h2>
        <h3 v-if="gameIsFailed">You have failed!</h3>
        <p class="results-p" v-if="gameIsCompleted">Your speed: {{ cpm }} cpm</p>
        <p class="results-p" v-if="gameIsCompleted">Your time: {{ time.raceResult }} sec</p>
        <router-link to="/" tag="a">
          <VButton class="main-button">Back to menu</VButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import VButton from '../components/UI/VButton.vue'
  export default {
    components: {
      VButton
    },
    data () {
      return {
        timer: '6',
        isPuffing: false,
        text: "",
        textArray: [],
        textSpan: {
          beforeHighlight: '',
          highlighted: '',
          afterHighlight: ''
        },
        inputValue: "",
        userMistakes: [],
        time: {
          start: null,
          finish: '',
          raceResult: ''
        },
        cpm: '',
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
      isMistaken () {
        return this.$store.getters.isMistaken
      },
      userData () {
        return this.$store.getters.userData
      },
      loadedBookSnippet () {
        return this.$store.getters.loadedBookSnippet
      },
      loadedRacingHistory () {
        return this.$store.getters.getRacingHistory
      },
      averageSpeed () {
        return this.$store.getters.getAverageSpeed
      },
      successRate () {
        return this.$store.getters.getSuccessRate
      },
      wordMatch () {
        return this.inputValue === this.textSpan.highlighted
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
      getBookSnippet () {
        this.$store.dispatch('getBookSnippet')
      },
      loadRacingHistory (invocationContext) {
        this.$store.dispatch('loadRacingHistory', invocationContext)
      },
      stringToArray () {
        this.text = this.loadedBookSnippet.text
        this.textArray = this.text.split(' ')
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
      startInit () {
        this.textSpan.highlighted = this.textArray[0]
        this.textArray.splice(0, 1)
        this.textSpan.afterHighlight = this.textArray.join('')
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
          // this.isMistaken = true
          this.$store.commit('setMistaken', true)
        }
        // If there isn't any discrepancies - make mistaken value true
        if (falseCollector.length === 0 && this.isMistaken) {
          this.$store.commit('setMistaken', false)
          // this.isMistaken = false
        }
        if (this.userMistakes.length > 2) {
          this.$store.commit('setMistaken', false)
          this.finishFailedGame()
        }
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
      calculateTimeAndCpm () {
        this.time.raceResult = ((this.time.finish.getTime() - this.time.start.getTime()) / 1000).toFixed(1)
        this.cpm = Math.round((this.text.length / this.time.raceResult) * 60)
      },
      pushToRacingHistory (status) {
        const date = new Date().toISOString()
        const result = {
          cpm: this.cpm,
          date,
          status: status ? 'completed' : 'failed'
        }
        this.$store.commit('pushToRacingHistory', result)
      },
      countAverageSpeedAndRate () {
        this.$store.dispatch('countAverageSpeedAndRate')
      },
      postRaceResult (status) {
        let gameResult = {
          cpm: status ? this.cpm : null,
          date: new Date(),
          status: status ? 'completed' : 'failed'
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
        this.pushToRacingHistory(true)
        this.postRaceResult(true)
        this.checkAndUpdateRecord()
        this.gameIsOver = true
        this.gameIsCompleted = true
        this.countAverageSpeedAndRate()
        if (this.moreThenFiftyRaces) {
          this.postInTop()
        }
      },
      finishFailedGame () {
        this.pushToRacingHistory(false)
        this.postRaceResult(false)
        this.gameIsOver = true
        this.gameIsFailed = true
        this.loadRacingHistory()
        this.countAverageSpeedAndRate()
        if (this.moreThenFiftyRaces) {
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
      this.loadRacingHistory('game')
    },
    mounted () {
      this.recursiveTimer()
    },
    destroyed () {
      this.$store.commit('setMistaken', false)
    }
  }
</script>

<style>
  .main-wrapper {
    font-weight: 300;
    font-size: 28px;
    padding-top: 80px;
    overflow: hidden;
  }

  @media(max-width: 850px) {
    .main-wrapper {
      padding: 20px;
    }
  }

  .game-wrapper {
    margin: auto;
    min-width: 620px;
    max-width: 800px;
  }

  .text-wrapper {
    background: white;
    border: 1px solid #cacaca;
    line-height: 1.4;    
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
    padding: 10px 0 10px 15px;
    display:block;
    font-size:16px;
    /*font-weight: 300;*/
    font-family: inherit;
    width: 100%;
    background: #fff;
    /*border: 1px solid #cacaca;*/
  }

  .game-input:focus {
    outline: none;
  }

  .results {
    display: flex;
    margin: auto;
    min-width: 620px;
    max-width: 800px;
    background: white;
    text-align: center;
  }

  .results-img {
    height: 500px;
    max-width: 350px;
  }

  .results-info {
    border: 1px solid #cacaca;
    border-left: none;    
    padding: 50px 20px 20px;
    width: 100%;
  }

  .results-p {
    font-size: 20px;
  }

  .book-title {
    font-size: 40px;
    font-weight: 700;
    margin: 0 0 5px;
  }

  .by-author {
    font-weight: 400;
    color: #c5c5c5;
    font-size: 26px;
    margin: 0;
  }

  .back-button {
    margin: 30px auto 0 auto;
    display: block;
    width: 200px;
  }


  .mistaken {
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
