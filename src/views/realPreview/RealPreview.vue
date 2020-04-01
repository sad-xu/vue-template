<template>
  <div class="exp2">
    Real Preview
    <div class="box">
      <div v-for="item in previewList" :key="item.name" class="iframe-wrapper">
        <iframe
          :src="item.src"
          frameborder="0" scrolling="no"
          class="iframe" sandbox="allow-scripts allow-pointer-lock allow-same-origin"
          @load="iframeLoaded">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>

// const jsText = require('./test.js').default.toString()

export default {
  name: 'RealPreview',
  data() {
    return {
      previewList: [{
        name: 'css animation',
        src: '/animation.html'
      }, {
        name: 'canvas',
        src: '/canvas.html'
      }, {
        name: 'transition & gif',
        src: '/transition-gif.html'
      }, {
        name: 'video',
        src: '/video.html'
      }]
    }
  }
  // methods: {
  //   iframeLoaded(e) {
  //     let idocument = e.target.contentWindow.document
  //     let el = idocument.createElement('script')
  //     el.text = `(${jsText}())`
  //     idocument.head.appendChild(el)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.exp2 {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 40px;
  font-weight: bold;
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 30px;
    .iframe-wrapper {
      width: 45%;
      height: 40%;
    }
  }
}

.stop-animation /deep/ {
  width: 200%;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
  *,
  *::before,
  *::after {
    animation-play-state: paused !important;
  }
}

iframe {
  width: 200%;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
}
</style>
