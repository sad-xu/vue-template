<template>
  <div>
    <el-button
      v-if="hasPermission('EXPORT_PDF')"
      v-log="{ action: 'export pdf' }"
      @click="doExportPDF">
      Export To PDF
    </el-button>

    <el-table
      id="page-1" v-el-table-infinite-scroll="loadMore"
      :data="tableList" height="300"
      :infinite-scroll-distance="100" :infinite-scroll-immediate="false">
      <el-table-column prop="a"></el-table-column>
      <el-table-column prop="b"></el-table-column>
      <el-table-column prop="c"></el-table-column>
    </el-table>
    <div id="page-2">
      222点点滴滴
    </div>
    <div id="page-3">
      333呃呃呃
    </div>
  </div>
</template>

<script>
import { exportPDF } from '@/utils/export'

export default {
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
  #page-2,
  #page-3 {
    height: 300px;
  }
  #page-2 {
    background-color: pink;
  }
</style>
