<template>
  <div class="animate-wrapper">
    <sphere class="animate-item"></sphere>
    <svg-text class="animate-item"></svg-text>
    <mul-svg-text class="animate-item"></mul-svg-text>
    <smile class="animate-item"></smile>
  </div>
</template>

<script>
import Sphere from './components/Sphere'
import SvgText from './components/SvgText'
import MulSvgText from './components/MulSvgText'
import Smile from './components/Smile'

// 优化SVG代码 https://jakearchibald.github.io/svgomg/

export default {
  name: 'Animate',
  components: {
    Sphere,
    SvgText,
    MulSvgText,
    Smile
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.animate-wrapper {
  display: flex;
  flex-wrap: wrap;
  .animate-item {
    width: 45%;
    border-bottom: 1px dashed #9e9e9e;
    &:nth-of-type(odd) {
      border-right: 1px dashed #9e9e9e;
    }
  }
}
</style>
