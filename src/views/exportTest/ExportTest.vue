<template>
  <div>
    <div class="header">
      <h1>Export Test</h1>
      <div class="menu">
        <el-tooltip content="最短全局loading">
          <el-button v-log="'loading'" @click="loading">
            Loading
          </el-button>
        </el-tooltip>
        <el-tooltip content="手动增加埋点信息">
          <el-button @click="addLog">
            add a log
          </el-button>
        </el-tooltip>
      </div>
      <p class="tip">
        <i class="el-icon-warning-outline"></i>
        绿色边框表示该节点已被声明式埋点
      </p>
    </div>
    <el-tabs v-model="activeTabIndex" class="tabs">
      <el-tab-pane
        v-for="(item, index) in tabList" :key="item.label"
        :name="`${index}`">
        <div slot="label" class="tab-label">
          <svg-icon class="icon" :icon-class="item.icon"></svg-icon>
          {{ item.label }}
        </div>
      </el-tab-pane>
    </el-tabs>

    <component :is="comp"></component>
  </div>
</template>

<script>

export default {
  name: 'ExportTest',
  data() {
    return {
      comp: null,
      activeTabIndex: '0',
      tabList: [
        { label: '网页截图-基础版', path: './comps/ImgTest-1.vue', icon: 'shuye-4' },
        { label: '网页截图-升级版', path: './comps/ImgTest-2.vue', icon: 'shuye-5' },
        { label: '导出pdf', path: './comps/PdfTest.vue', icon: 'shuye-6' },
        { label: '导出Excel', path: './comps/ExcelTest.vue', icon: 'shuye-2' }
      ]
    }
  },
  watch: {
    activeTabIndex: {
      handler(i) {
        this.comp = require(`${this.tabList[i].path}`).default
      },
      immediate: true
    }
  },
  methods: {
    loading() {
      this.$showLoading()
      this.$hideLoading()
    },
    addLog() {
      this.$tracker.addLog('add one log')
      this.$tracker.addLog({ data: 'add two log' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    h1 {
      font-size: 40px;
    }
    .menu button {
      margin-left: 30px;
    }
    .tip {
      position: absolute;
      bottom: -100%;
      right: 0;
      font-size: 12px;
      color: #bdbdbd;
    }
  }

  .tab-label {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
  }

</style>
