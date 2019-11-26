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
    <el-table
      v-el-table-infinite-scroll="loadMore" :data="tableList"
      height="300"
      :infinite-scroll-distance="100" :infinite-scroll-immediate="false">
      <el-table-column prop="a"></el-table-column>
      <el-table-column prop="b"></el-table-column>
      <el-table-column prop="c"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { exportImg, exportExcel } from '@/utils/export'

export default {
  name: 'Example1',
  data() {
    return {
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
    },
    loadMore() {
      console.log('load')
      this.tableList = this.tableList.concat([
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 }
      ])
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
