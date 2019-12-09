<template>
  <div class="exp1">
    <p>EXP1</p>
    <el-button @click="loading">
      Loading
    </el-button>
    <el-button v-if="hasPermission('EXPORT_IMG')" @click="doExportImg">
      Export To Img
    </el-button>
    <el-button v-if="hasPermission('EXPORT_PDF')" @click="doExportPDF">
      Export To PDF
    </el-button>
    <el-button v-if="hasPermission('EXPORT_EXCEL')" @click="doExportExcel">
      Export To Excel
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
import { exportImg, exportPDF, exportExcel } from '@/utils/export'

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
    doExportPDF() {
      let idList = ['#page-1', '#page-2', '#page-3']
      exportPDF({
        name: 'pdf',
        elList: idList.map(id => this.$el.querySelector(id))
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

  #page-2, #page-3 {
    height: 300px;
  }
  #page-2 {
    background-color: pink;
  }
</style>
