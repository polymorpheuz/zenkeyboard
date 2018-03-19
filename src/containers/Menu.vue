<template>
  <div class="menu-wrapper">
    <div class="menu-item-wrapper">
      <div class="item-play" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/game" tag="a">
          <div class="circle play"  >
            <div class="play-icon" :class="{ 'play-visible': animation.play }"></div>
          </div>
          <h4 class="menu-title">PLAY</h4>
          <p class="description">There are only two mistakes
            that you can do.</p>
        </router-link>
      </div>

      <div class="item-faq" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/faq" tag="a">
          <div class="circle faq">
            <div class="faq-icon" :class="{ 'faq-visible': animation.faq }"></div>
          </div>
          <h4 class="menu-title">FAQ</h4>
          <p class="description">It’s really short and will
            not confuse you.</p>
        </router-link>
      </div>

      <div class="item-top" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/top" tag="a">
          <div class="circle top">
            <div class="top-icon" :class="{ 'top-visible': animation.top }"></div>
          </div>
          <h4 class="menu-title">TOP</h4>
          <p class="description">Only if you have played
            50 games.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        animation: {
          play: false,
          faq: false,
          top: false
        }
      }
    },
    methods: {
      toggleMenuItem (event) {
        if (event.currentTarget.classList[0] === 'item-play') {
          this.animation.play = true
        } else if (event.currentTarget.classList[0] === 'item-faq') {
          this.animation.faq = true
        } else {
          this.animation.top = true
        }
      },
      leaveMenuItem (event) {
        this.animation.play = false
        this.animation.faq = false
        this.animation.top = false
      }
    }
  }
</script>
<style scoped>
.menu-wrapper {
  z-index: 2;
  padding-top: 150px;
  text-align: center;
}

.menu-item-wrapper {
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
}

@media(max-width: 850px) {
  .menu-wrapper {
    padding-top: 40px;
  }
}

.menu-title {
  color: #5a5a5a;
  font-size: 32px;
  font-weight: 700;
  margin: 10px 0 20px;
}

.description {
  font-size: 16px;
  color: #8f8f8f;
  padding: 0 10px;
  min-width: 150px;
  max-width: 250px;
  margin: 0;
}

.circle {
  width: 170px;
  height: 170px;
  border-radius: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.play-icon {
  height: 56px;
  width: 70px;
  background: url('../assets/play.svg') no-repeat;
  transition: margin-top 0.5s ease;
  margin: -80px auto 60px auto;
}

.faq-icon {
  width: 41px;
  height: 70px;
  background: url('../assets/faq.svg') no-repeat;
  transition: margin-top 0.5s ease;
  margin: -100px auto 60px auto;
}

.top-icon {
  width: 77px;
  height: 68px;
  background: url('../assets/top.svg') no-repeat;
  transition: margin-top 0.5s ease;
  margin: -80px auto 60px auto;
}

.play-visible {
  margin-top: 55px;
}


.faq-visible {
  transition: margin-top 0.5s ease;
  margin: 50px auto 0 auto;
}

.top-visible {
  margin-top: 55px;
}

.play {
  background-color: #27aae1;
}

.faq {
  background-color: #ee3769;
}

.top {
  background-color: #5a5a5a;
}
</style>
