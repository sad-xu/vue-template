<template>
  <div class="ez-table">
    <!-- <div class="ez-corner">
      <div
        v-for="item in tableData.fixedHead" :key="item.prop"
        :style="`width:${item.width}px;`" class="cell">
        {{ item.label }}
      </div>
    </div> -->
    <!-- 左侧固定列 -->
    <div class="ez-side">
      <div class="ez-side-head">
        <div
          v-for="item in tableData.fixedHead" :key="item.prop"
          :style="`width:${item.width}px;`" class="cell">
          {{ item.label }}
        </div>
      </div>
      <div v-for="(row, rowIndex) in tableBodyData" :key="rowIndex" class="ez-side-row">
        <div
          v-for="col in tableData.fixedHead" :key="col.prop"
          class="cell" :style="`width:${col.width}px;`">
          {{ row[col.prop] }}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="ez-content" :style="`left: ${tableData.fixedWidth}px;`">
      <div class="ez-content-head">
        <div
          v-for="item in tableData.normalHead" :key="item.label"
          :style="`width:${item.width}px;`" class="cell">
          {{ item.label }}
        </div>
      </div>
      <table class="ez-content-table">
        <colgroup>
          <col v-for="item in tableData.normalHead" :key="item.prop" :width="item.width">
        </colgroup>
        <tr v-for="(row, rowIndex) in tableBodyData" :key="rowIndex">
          <td v-for="(col, colIndex) in tableData.normalHead" :key="colIndex">
            <div class="cell">
              {{ row[col.prop] }}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/*
TODO
  1. 排序
  2. 函数式 solt

*/

export default {
  name: 'EzTable',
  data() {
    return {
      tableHeadData: Array.from({ length: 40 }).map((item, i) => ({
        label: `index-${i}`,
        prop: `prop-${i}`,
        width: 100,
        fixed: i <= 1
      })),
      tableBodyData: Array.from({ length: 50 }).map((d, index) => {
        let obj = {}
        for (let i = 0; i < 40; i++) {
          obj[`prop-${i}`] = `item-${i}-${index}`
        }
        return obj
      })
    }
  },
  computed: {
    tableData: function() {
      let fixedHead = []
      let normalHead = []
      let fixedWidth = 0
      this.tableHeadData.forEach(item => {
        if (item.fixed) {
          fixedHead.push(item)
          fixedWidth += item.width
        } else normalHead.push(item)
      })
      return {
        fixedHead,
        normalHead,
        fixedWidth
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
  .ez-table {
    position: relative;
    font-size: 14px;
    overflow: scroll;
    will-change: scroll-position;

    .ez-corner {
      display: inline-flex;
      position: sticky;
      left: 0;
      top: 0;
      background-color: red;
      z-index: 99;
      .cell {
          min-height: 40px;
        }
    }

    .cell {
      display: flex;
      justify-content: left;
      align-items: center;
      flex-shrink: 0;
      line-height: 23px;
      min-height: 46px;
      padding: 3px 10px;
    }
    .ez-side {
      display: flex;
      flex-direction: column;
      position: sticky;
      float: left;
      left: 0;
      box-shadow: 0 0 10px rgba(0,0,0,.12);
      z-index: 3;
      .ez-side-head {
        display: flex;
        flex-shrink: 0;
        position: sticky;
        top: 0;
        background-color: #d6edff;
        .cell {
          min-height: 40px;
        }
      }
      .ez-side-row {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        background-color: #fff;
        &:nth-of-type(even) {
          background-color: #edf5fe;
        }
      }
    }
    .ez-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      .ez-content-head {
        display: flex;
        flex-shrink: 0;
        position: sticky;
        top: 0;
        background-color: #d6edff;
        .cell {
          min-height: 40px;
        }
      }
      .ez-content-table {
        flex-shrink: 0;
        border-spacing: inherit;
        tr {
          background-color: #fff;
          &:nth-of-type(even) {
            background-color: #edf5fe;
          }
        }
      }
    }
  }
</style>
