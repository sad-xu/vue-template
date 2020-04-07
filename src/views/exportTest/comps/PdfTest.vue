<template>
  <div>
    <p class="header">
      <el-button
        v-if="hasPermission('EXPORT_PDF')"
        v-log="{ action: 'export pdf' }"
        @click="doExportPDF">
        Export To PDF
      </el-button>
    </p>
    <div class="content">
      <el-table
        id="page-1" v-el-table-infinite-scroll="loadMore"
        :data="tableList" height="300"
        :infinite-scroll-distance="100" :infinite-scroll-immediate="false">
        <el-table-column prop="a" label="a"></el-table-column>
        <el-table-column prop="b" label="b"></el-table-column>
        <el-table-column prop="c" label="c"></el-table-column>
      </el-table>
      <div id="page-2">
        第二页 Page-2
        <div id="item-chart"></div>
      </div>
      <div id="page-3">
        第三页 Page-3
      </div>
    </div>
  </div>
</template>

<script>
import { exportPDF } from '@/utils/export'
import Highcharts from '@/utils/highcharts'
require('highcharts/modules/item-series')(Highcharts)

export default {
  data() {
    return {
      // chartList: [],
      tableList: [
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // beforeDestroy() {
  //   this.chartList.forEach(chart => chart.destroy())
  // },
  methods: {
    loadMore() {
      this.tableList = this.tableList.concat([
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 }
      ])
    },
    initChart() {
      const that = this
      Highcharts.chart(this.$el.querySelector('#item-chart'), {
        _uid: that._uid,
        title: {
          text: null
        },
        legend: {
          labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
        },
        series: [{
          type: 'item',
          name: 'Representatives',
          keys: ['name', 'y', 'color', 'label'],
          data: [
            ['The Left', 69, '#BE3075', 'DIE LINKE'],
            ['Social Democratic Party', 153, '#EB001F', 'SPD'],
            ['Alliance 90/The Greens', 67, '#64A12D', 'GRÜNE'],
            ['Free Democratic Party', 80, '#FFED00', 'FDP'],
            ['Christian Democratic Union', 200, '#000000', 'CDU'],
            ['Christian Social Union in Bavaria', 46, '#008AC5', 'CSU'],
            ['Alternative for Germany', 94, '#009EE0', 'AfD']
          ],
          dataLabels: {
            enabled: true,
            format: '{point.label}'
          },
          center: ['50%', '88%'],
          size: '170%',
          startAngle: -100,
          endAngle: 100
        }]
      }, chart => {
        // this.chartList = Object.freeze([chart])
      })
    },
    doExportPDF() {
      let idList = ['#page-1', '#page-2', '#page-3']
      exportPDF({
        name: 'pdf',
        elList: idList.map(id => this.$el.querySelector(id))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    text-align: center;
  }
  .content {
    padding: 0 20px;
  }

  #page-2,
  #page-3 {
    min-height: 300px;
    margin-top: 30px;
  }
  #page-2 {
    background-color: pink;
  }
  #page-3 {
    background-color: paleturquoise;
  }
</style>
