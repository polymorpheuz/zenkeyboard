<template>
  <div class="menu-wrapper">
    <div class="menu-item-wrapper">
      <div class="item-play" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/game" tag="a">
          <div class="circle play"  >
            <div class="play-icon" :class="{ 'play-visible': animation.play, 'play-invisible': !animation.play}"></div>
          </div>
          <h4>PLAY</h4>
          <p class="description">There are only two mistakes
            that you can do.</p>
        </router-link>
      </div>

      <div class="item-faq" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/faq" tag="a">
          <div class="circle faq">
            <div class="faq-icon" :class="{ 'faq-visible': animation.faq, 'faq-invisible': !animation.faq}"></div>
          </div>
          <h4>FAQ</h4>
          <p class="description">It’s really short and will
            not confuse you.</p>
        </router-link>
      </div>

      <div class="item-top" @mouseover="toggleMenuItem" @mouseout="leaveMenuItem">
        <router-link to="/top" tag="a">
          <div class="circle top">
            <div class="top-icon" :class="{ 'top-visible': animation.top, 'top-invisible': !animation.top}"></div>
          </div>
          <h4>TOP</h4>
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
<style lang="scss">
  .menu-wrapper {
    height: 100vh;
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

  h4 {
    color: #5a5a5a;
    font-weight: 700;
  }

  .description {
    font-size: 18px;
    color: #8f8f8f;
    width: 250px;
  }

  .circle {
    width: 190px;
    height: 190px;
    border-radius: 100%;
    display: inline-block;
    overflow: hidden;
  }

  .play-icon {
    height: 78px;
    width: 116px;
    background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Fgamepad.png?alt=media&token=da25ea7c-ddb2-4c84-a6cf-70a1bbb89e4a') no-repeat;
  }

  .faq-icon {
    width: 92px;
    height: 92px;
    background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Fquestion.png?alt=media&token=16c497e3-24ea-484d-8c4a-1226ce380f7a') no-repeat;
  }

  .top-icon {
    width: 77px;
    height: 68px;
    background: url('https://firebasestorage.googleapis.com/v0/b/zenkeyboard-f8d44.appspot.com/o/ui-images%2Frating.png?alt=media&token=7468e8cd-5f99-4915-8cdf-af37bc5a8c8b')
  }

  .play-visible {
    transition: margin-top 0.5s ease;
    margin: 50px auto 60px auto;
  }

  .play-invisible {
    transition: margin-top 0.5s ease;
    margin: -80px auto 60px auto;
  }

  .faq-visible {
    transition: margin-top 0.5s ease;
    margin: 50px auto 60px auto;
  }

  .faq-invisible {
    transition: margin-top 0.5s ease;
    margin: -100px auto 60px auto;
  }

  .top-visible {
    transition: margin-top 0.5s ease;
    margin: 50px auto 60px auto;
  }

  .top-invisible {
    transition: margin-top 0.5s ease;
    margin: -80px auto 60px auto;
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
