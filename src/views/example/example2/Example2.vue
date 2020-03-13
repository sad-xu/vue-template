<template>
  <div class="exp2">
    Example2
    <div class="box">
      <css-stage class="stop-animation"></css-stage>
    </div>
  </div>
</template>

<script>
import CssStage from '../../cssStage/CssStage'

export default {
  name: 'Example2',
  components: {
    CssStage
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
  *, *::before, *::after {
    animation-play-state: paused !important;
  }
}
</style>
