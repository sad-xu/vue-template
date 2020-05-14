<template>
  <div>
    <div class="box">
      <el-button class="button" @click="startScreenshot">
        start
      </el-button>
      <div class="tip">
        <p>特点</p>
        <p>1. 通过 Vuex 处理，可一次截取多张图</p>
        <p>2. 截取图片的内容不受设备尺寸制约，即同一页面，任何设备截取生成的图片都是相同的</p>
        <p>3. 截取的图片内容可与原始网页内容不一致</p>
      </div>
    </div>
    <div id="word-chart"></div>
    <screenshot-wrapper @generateStart="generateStart">
      <div id="word-chart-screenshot"></div>
    </screenshot-wrapper>
  </div>
</template>

<script>
import ScreenshotWrapper from '@/components/screenshot-wrapper/ScreenshotWrapper'
import Highcharts from '@/utils/highcharts'
require('highcharts/modules/wordcloud')(Highcharts)

export default {
  components: {
    ScreenshotWrapper
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart(isScreenshot = false) {
      const that = this
      let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.'
      let data = text.split(/[,\\. ]+/g)
        .reduce((acc, word) => {
          let item = acc.find(item => item.name === word)
          if (item) {
            item.weight += 1
          } else {
            acc.push({
              name: word,
              weight: 1
            })
          }
          return acc
        }, [])
      Highcharts.chart(this.$el.querySelector(`#${isScreenshot ? 'word-chart-screenshot' : 'word-chart'}`), {
        _uid: that._uid,
        chart: {
          animation: !isScreenshot
        },
        series: [{
          type: 'wordcloud',
          data: data
        }]
      })
    },
    startScreenshot() {
      this.$store.dispatch('app/startScreenshot')
    },
    generateStart() {
      this.initChart(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-around;
  .button {
    flex-shrink: 0;
    align-self: center;
  }
  .tip {
    font-size: 14px;
    color: #757575;
  }
}
</style>
