<template>
  <div v-if="openWrapper" id="screenshotWrapper">
    <slot></slot>
  </div>
</template>

<script>
import { exportImg2 } from '@/utils/export'

/**
 * @generateStart 生成开始
 *
 */

export default {
  name: 'ScreenshotWrapper',
  data() {
    return {
      openWrapper: false
    }
  },
  computed: {
    screenshotTime() {
      return this.$store.getters.screenshotTime
    }
  },
  watch: {
    screenshotTime() {
      this.openWrapper = true
      this.$nextTick(() => {
        // 通知父组件 生成slot里的图表
        this.$emit('generateStart')
        // 截图 推入队列
        let p = exportImg2({
          name: 'iii',
          el: this.$el
        })
        console.log(p)
        this.$store.dispatch('app/pushImgList', p)
        // 结束
        p.finally(() => {
          this.openWrapper = false
          // 无需通知父组件销毁图标，已有自动销毁功能
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#screenshotWrapper {
  position: fixed;
  left: -9999px;
  bottom: 9999px;
  // A4 宽度
  width: 595px;
}
</style>
