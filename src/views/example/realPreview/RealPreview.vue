<template>
  <div class="exp2">
    Example2
    <div class="box">
      <!-- <component
        :is="item.comp"
        v-for="item in compList" :key="item.path"
        class="stop-animation">
      </component> -->
      <iframe
        src="https://www.dogedoge.com/"
        frameborder="0" scrolling="no"
        sandbox="allow-scripts allow-pointer-lock allow-same-origin"
        class="iframe">
      </iframe>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RealPreview',
  data() {
    return {
      // compList: [{
      //   path: './works/CSSAnimation.vue',
      //   comp: null
      // }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(document.querySelector('.iframe').document)
    })
    // document.querySelector('.iframe').document.body
  }
}
</script>

<style lang="scss" scoped>
.exp2 {
  font-size: 40px;
  font-weight: bold;
  .box {
    position: relative;
    width: 600px;
    height: 400px;
    overflow: hidden;
    margin: 30px;
  }
}

.stop-animation /deep/ {
  width: 200%;
  height: 200%;
  transform-origin: left top;
  transform: scale(.5);
  *, *::before, *::after {
    animation-play-state: paused !important;
  }
}

iframe {
  width: 200%;
  height: 200%;
  transform-origin: left top;
  transform: scale(.5);
}
</style>
