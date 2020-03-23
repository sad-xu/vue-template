<template>
  <div class="ez-table">
    <!--  -->
    <div class="ez-side">
      <div class="ez-side-head">
        <span
          v-for="item in tableData.fixedHead" :key="item.prop"
          :style="`width:${item.width}px;`" class="ez-item">
          {{ item.label }}
        </span>
      </div>
      <div v-for="(row, rowIndex) in tableBodyData" :key="rowIndex" class="ez-side-row">
        <span
          v-for="col in tableData.fixedHead" :key="col.prop"
          :style="`width:${col.width}px;`">
          {{ row[col.prop] }}
        </span>
      </div>
    </div>
    <!--  -->
    <div class="ez-content">
      <div class="ez-content-head">
        <span
          v-for="item in tableData.normalHead" :key="item.label"
          :style="`width:${item.width}px;`" class="ez-item">
          {{ item.label }}
        </span>
      </div>
      <table class="ez-content-table">
        <colgroup>
          <col v-for="item in tableData.normalHead" :key="item.prop" :width="item.width">
        </colgroup>
        <tr v-for="(row, rowIndex) in tableBodyData" :key="rowIndex">
          <td v-for="(col, colIndex) in tableData.normalHead" :key="colIndex">
            {{ row[col.prop] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EzTable',
  data() {
    return {
      tableHeadData: [{
        label: '日期',
        prop: 'date',
        width: 100,
        fixed: true
      }, {
        label: '姓名',
        prop: 'name',
        width: 100,
        fixed: true
      }, {
        label: '地址',
        prop: 'address',
        width: 100
      }, {
        label: 'aaaaaa',
        prop: 'aa',
        width: 100
      }, {
        label: 'bbbbbb',
        prop: 'bb',
        width: 100
      }, {
        label: 'cccccc',
        prop: 'cc',
        width: 100
      }, {
        label: 'dddddd',
        prop: 'dd',
        width: 100
      }, {
        label: 'eeeeee',
        prop: 'ee',
        width: 100
      }],
      tableBodyData: Array.from({ length: 10 }).map((item, index) => ({
        date: '2016-05-02',
        name: '王小虎' + index,
        address: '上海市普陀区金沙江路 1518 弄',
        aa: 'aaaa',
        bb: 'bbbbb',
        cc: '踩踩踩踩踩踩踩踩踩踩踩',
        dd: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',
        ee: '呃呃呃呃呃呃呃呃呃'
      }))
    }
  },
  computed: {
    tableData: function() {
      let fixedHead = []
      let normalHead = []
      this.tableHeadData.forEach(item => {
        if (item.fixed) fixedHead.push(item)
        else normalHead.push(item)
      })
      return {
        fixedHead,
        // fixedBody,
        normalHead
        // normalBody: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let trList = this.$el.querySelector('.ez-content-table').querySelectorAll('tr')
      let sideRowList = this.$el.querySelectorAll('.ez-side-row')
      sideRowList.forEach((row, index) => {
        row.style.height = trList[index].clientHeight + 'px'
      })
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

  .ez-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ez-table {
    display: flex;
    position: relative;
    // width: 600px;
    // height: 400px;
    overflow: scroll;
    .ez-side {
      display: flex;
      flex-direction: column;
      position: sticky;
      float: left;
      left: 0;
      z-index: 3;
      .ez-side-head {
        display: flex;
        flex-shrink: 0;
        position: sticky;
        top: 0;
        height: 40px;
        background-color: green;
      }
      .ez-side-row {
        display: flex;
        flex-shrink: 0;
        background-color: red;
        align-items: center;
      }
    }
    .ez-content {
      display: flex;
      flex-direction: column;
      .ez-content-head {
        display: flex;
        flex-shrink: 0;
        position: sticky;
        top: 0;
        height: 40px;
        z-index: 2;
        > span {
          flex-shrink: 0;
          background-color: green;
        }
      }
      .ez-content-table {
        flex-shrink: 0;
        border-spacing: inherit;
      }
    }
  }
</style>
