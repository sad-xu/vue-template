<template>
  <div>
    <h2>UI Lang</h2>
    <div id="switch"></div>
  </div>
</template>

<script>
import uiLangInit from './uiLang.js'

export default {
  name: 'UILang',
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this)
      uiLangInit({
        el: this.$el,
        code: 'clicking on "#switch" toggle class "active" on "#switch"'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  #switch {
    width: 100px;
    height: 100px;
    border: 1px solid #333;
    background-color: palevioletred;
  }

  #switch .active {
    background-color: powderblue;
  }

</style>
