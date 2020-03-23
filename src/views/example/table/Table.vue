<template>
  <div class="wrapper">
    <h1>Example-table</h1>
    <ez-table class="table-wrapper"></ez-table>
  </div>
</template>

<script>
import EzTable from './ez-table'

export default {
  name: 'Table',
  components: {
    EzTable
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    background-color: #eee;
  }

  .table-wrapper {
    width: 500px;
    height: 400px;
    margin: 0 auto;
  }
</style>
