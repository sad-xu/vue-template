<template>
  <div>
    <el-button
      v-if="hasPermission('EXPORT_IMG')"
      v-log="{ action: 'export img' }"
      @click="doExportImg">
      Export To Img
    </el-button>
    <div class="content">
      <!-- 图标无法被截图 -->
      <svg-icon class="icon" icon-class="xiaolu"></svg-icon>
      <!--  -->
      <div id="chart"></div>
    </div>
  </div>
</template>

<script>
import { exportImg } from '@/utils/export'
import Highcharts from '@/utils/highcharts'
require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/dependency-wheel')(Highcharts)

export default {
  data() {
    return {
      // chartList: []
    }
  },
  // beforeDestroy() {
  //   this.chartList.forEach(chart => chart.destroy())
  // },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    doExportImg() {
      exportImg({
        el: this.$el,
        name: 'img'
      })
    },
    initChart() {
      const that = this
      Highcharts.chart(this.$el.querySelector('#chart'), {
        _uid: that._uid,
        title: {
          text: null
        },
        series: [{
          keys: ['from', 'to', 'weight'],
          data: [
            ['Brazil', 'Portugal', 5],
            ['Brazil', 'France', 1],
            ['Brazil', 'Spain', 1],
            ['Brazil', 'England', 1],
            ['Canada', 'Portugal', 1],
            ['Canada', 'France', 5],
            ['Canada', 'England', 1],
            ['Mexico', 'Portugal', 1],
            ['Mexico', 'France', 1],
            ['Mexico', 'Spain', 5],
            ['Mexico', 'England', 1],
            ['USA', 'Portugal', 1],
            ['USA', 'France', 1],
            ['USA', 'Spain', 1],
            ['USA', 'England', 5],
            ['Portugal', 'Angola', 2],
            ['Portugal', 'Senegal', 1],
            ['Portugal', 'Morocco', 1],
            ['Portugal', 'South Africa', 3],
            ['France', 'Angola', 1],
            ['France', 'Senegal', 3],
            ['France', 'Mali', 3],
            ['France', 'Morocco', 3],
            ['France', 'South Africa', 1],
            ['Spain', 'Senegal', 1],
            ['Spain', 'Morocco', 3],
            ['Spain', 'South Africa', 1],
            ['England', 'Angola', 1],
            ['England', 'Senegal', 1],
            ['England', 'Morocco', 2],
            ['England', 'South Africa', 7],
            ['South Africa', 'China', 5],
            ['South Africa', 'India', 1],
            ['South Africa', 'Japan', 3],
            ['Angola', 'China', 5],
            ['Angola', 'India', 1],
            ['Angola', 'Japan', 3],
            ['Senegal', 'China', 5],
            ['Senegal', 'India', 1],
            ['Senegal', 'Japan', 3],
            ['Mali', 'China', 5],
            ['Mali', 'India', 1],
            ['Mali', 'Japan', 3],
            ['Morocco', 'China', 5],
            ['Morocco', 'India', 1],
            ['Morocco', 'Japan', 3],
            ['Japan', 'Brazil', 1]
          ],
          type: 'dependencywheel',
          dataLabels: {
            color: '#333',
            textPath: {
              enabled: true,
              attributes: {
                dy: 5
              }
            },
            distance: 10
          },
          size: '95%'
        }]
      }, chart => {
        // this.chartList = Object.freeze([chart])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      font-size: 150px;
      text-align: center;
      width: 100%;
    }
    #chart {
      width: 100%;
    }
  }
</style>
