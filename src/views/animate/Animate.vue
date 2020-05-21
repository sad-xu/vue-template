<template>
  <div class="animate-wrapper">
    <sphere class="animate-item"></sphere>
    <svg-text class="animate-item"></svg-text>
    <mul-svg-text class="animate-item"></mul-svg-text>
  </div>
</template>

<script>
import Sphere from './components/Sphere'
import SvgText from './components/SvgText'
import MulSvgText from './components/MulSvgText'

// 优化SVG代码 https://jakearchibald.github.io/svgomg/

export default {
  name: 'Animate',
  components: {
    Sphere,
    SvgText,
    MulSvgText
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
  .animate-item {
    width: 45%;
  }
}
</style>
