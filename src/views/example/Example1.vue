<template>
  <div class="exp1">
    <p>EXP1</p>
    <el-button @click="loading">
      Loading
    </el-button>
    <el-button @click="doExportImg">
      Export To Img
    </el-button>
    <el-button @click="doExportExcel">
      Export To Excel
    </el-button>
  </div>
</template>

<script>
import { exportImg, exportExcel } from '@/utils/export'

export default {
  name: 'Example1',
  methods: {
    loading() {
      this.$showLoading()
      this.$hideLoading()
    },
    doExportImg() {
      exportImg({
        el: this.$el,
        name: 'img'
      })
    },
    doExportExcel() {
      exportExcel({
        filename: 'aaa',
        data: [['a', 'b', 'c'], [1, 2, 3], [4, 5, 6]]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.exp1 {
  font-size: 40px;
  font-weight: bold;
}
</style>
