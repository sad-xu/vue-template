import Highcharts from 'highcharts'
import Vue from 'vue'

/**
 * 页面销毁，但页面里的图表实例并没有销毁
 * 当前网站所有的图表实例都存在 Highcharts.charts 中
 *
 * 额外操作：
 *  1. 不再从 node_modules 引入，而是 import Highcharts from '@/utils/highcharts'
 *  2. 新增一个配置字段 _uid: 当前组件的_uid
 */
Vue.mixin({
  // 全局钩子，组件销毁且内部有图表时，自动销毁该图表
  beforeDestroy() {
    const UID = this._uid
    Highcharts.charts.forEach(chart => {
      if (chart && chart.userOptions._uid === UID) {
        chart.destroy()
      }
    })
  }
})

// 图表自定义全局配置
Highcharts.setOptions({
  title: null,
  credits: {
    enabled: false
  }
})

export default Highcharts
