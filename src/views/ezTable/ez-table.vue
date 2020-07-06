<template>
  <div class="table-wrapper">
    <!-- 左上角 -->
    <div v-if="tableData.fixedHeader.length" class="ez-corner">
      <div
        v-for="item in tableData.fixedHeader" :key="item.prop"
        :style="`width:${item.width}px;`" class="cell"
        @click.stop="handleHeaderClick(item)">
        {{ item.label }}
        <!-- sort -->
        <div
          v-if="item.sortable" class="sort-wrapper"
          :class="sortInfo.prop === item.prop ? `${sortInfo.order}-active` : ''">
          <i class="ascending"></i>
          <i class="descending"></i>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="ez-table" @scroll="handleScroll">
      <!-- 左侧固定列 -->
      <div v-if="tableData.fixedHeader.length" class="ez-side">
        <!-- 被左上角覆盖 -->
        <div class="ez-side-header" style="visibility: hidden;">
          <div
            v-for="item in tableData.fixedHeader" :key="item.prop"
            :style="`width:${item.width}px;`" class="cell">
            {{ item.label }}
          </div>
        </div>
        <div
          v-for="(row, rowIndex) in tableBodyData" :key="rowIndex"
          class="ez-side-row" @click.stop="handleRowClick(row, rowIndex)">
          <div
            v-for="col in tableData.fixedHeader" :key="col.prop"
            class="cell" :style="`width:${col.width}px;`">
            <!-- slot -->
            <slot v-if="$scopedSlots[col.prop]" :row="row" :name="col.prop"></slot>
            <span v-else>{{ row[col.prop] }}</span>
          </div>
        </div>
      </div>
      <!-- 非固定列 -->
      <div class="ez-content" :style="`left: ${tableData.fixedWidth}px;`">
        <!-- header -->
        <div class="ez-content-header">
          <div
            v-for="item in tableData.normalHeader" :key="item.prop"
            :style="`width:${item.width}px;`" class="cell"
            @click.stop="handleHeaderClick(item)">
            {{ item.label }}
            <!-- sort -->
            <div
              v-if="item.sortable" class="sort-wrapper"
              :class="sortInfo.prop === item.prop ? `${sortInfo.order}-active` : ''">
              <i class="ascending"></i>
              <i class="descending"></i>
            </div>
          </div>
        </div>
        <!-- content -->
        <table class="ez-content-table">
          <colgroup>
            <col v-for="item in tableData.normalHeader" :key="item.prop" :width="item.width">
          </colgroup>
          <tr
            v-for="(row, rowIndex) in tableBodyData" :key="rowIndex"
            @click="handleRowClick(row, rowIndex)">
            <td v-for="(col, colIndex) in tableData.normalHeader" :key="colIndex">
              <!-- slot -->
              <div class="cell">
                <slot v-if="$scopedSlots[col.prop]" :row="row" :name="col.prop"></slot>
                <span v-else>{{ row[col.prop] }}</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/*
TODO
  1. sort ✌
  2. slot ✌
  3. infinite-scroll

  @sortChange 排序事件
  @rowClick   行点击事件
*/

const throttle = (fn, delay = 200) => {
  let timeId = null
  return function(...args) {
    if (timeId) return
    timeId = window.setTimeout(() => {
      fn.apply(this, args)
      timeId = null
    }, delay)
  }
}

export default {
  name: 'EzTable',
  props: {
    /**
     * 表头数据
     * [{
     *  label: String,
     *  prop: String,
     *  width: Number,
     *  fixed: Boolean,
     *  sortable: Boolean
     * }]
     *
     */
    tableHeaderData: {
      type: Array,
      required: true
    },
    /**
     * 内容
     * [{
     *  props: value
     * }]
     *
     */
    tableBodyData: {
      type: Array,
      required: true
    },
    /**
     * 无限滚动
     *  infiniteScroll 是否开启
     *  infiniteScrollDelay 节流延时
     *  infiniteScrollDistance 触发距离
     */
    infiniteScroll: {
      type: Boolean,
      default: false
    },
    infiniteScrollDelay: { // ????
      type: Number,
      default: 200
    },
    infiniteScrollDistance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 排序信息
      sortInfo: {
        prop: '',
        order: '' // ascending, descending
      },
      // 上次纵向滚动距离
      lastScrollTop: 0
    }
  },
  computed: {
    tableData: function() {
      const fixedHeader = []
      const normalHeader = []
      let fixedWidth = 0
      this.tableHeaderData.forEach(item => {
        if (item.fixed) {
          fixedHeader.push(item)
          fixedWidth += item.width
        } else normalHeader.push(item)
      })
      return {
        fixedHeader,
        normalHeader,
        fixedWidth
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const trList = this.$el.querySelector('.ez-content-table').querySelectorAll('tr')
      const sideRowList = this.$el.querySelectorAll('.ez-side-row')
      // 同步固定列单元格高度
      sideRowList.forEach((row, index) => {
        row.style.height = trList[index].clientHeight + 'px'
      })
      // 同步固定列表头高度
      const headerHeight = this.$el.querySelector('.ez-content-header').clientHeight
      this.$el.querySelector('.ez-side .ez-side-header').style.height = headerHeight + 'px'
      this.$el.querySelector('.ez-corner').style.height = headerHeight + 'px'
    })
  },
  methods: {
    // 表头点击事件
    handleHeaderClick(item) {
      if (item.sortable) {
        if (item.prop === this.sortInfo.prop) {
          this.sortInfo.order = this.sortInfo.order === 'ascending' ? 'descending' : 'ascending'
        } else {
          this.sortInfo = {
            prop: item.prop,
            order: 'ascending'
          }
        }
        this.$emit('sortChange', this.sortInfo)
      }
    },
    // 某一行点击事件
    handleRowClick(row, rowIndex) {
      this.$emit('rowClick', row, rowIndex)
    },
    // 滚动事件
    handleScroll: throttle(function(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target
      if (this.lastScrollTop === scrollTop) return
      this.lastScrollTop = scrollTop
      if (scrollHeight - scrollTop - clientHeight <= this.infiniteScrollDistance) {
        this.$emit('loadMore')
      }
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
  .table-wrapper {
    position: relative;
    overflow: hidden;
    font-size: 14px;
  }

  // 单元格
  .cell {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-shrink: 0;
    line-height: 23px;
    min-height: 46px;
    padding: 3px 10px;
  }

  // 左上角
  .ez-corner {
    display: flex;
    flex-shrink: 0;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #d6edff;
    z-index: 3;
    .cell {
      min-height: 40px;
    }
  }

  .ez-table {
    position: relative;
    overflow: scroll;
    will-change: scroll-position;
    height: 100%;
    // 左侧固定列
    .ez-side {
      display: flex;
      flex-direction: column;
      position: sticky;
      float: left;
      left: 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
      z-index: 2;
      .ez-side-header {
        display: flex;
        flex-shrink: 0;
        // position: sticky;
        // top: 0;
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
        &:nth-of-type(odd) {
          background-color: #edf5fe;
        }
      }
    }
    // 右侧普通区
    .ez-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      .ez-content-header {
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

  .sort-wrapper {
    position: relative;
    height: 34px;
    width: 24px;
    .ascending,
    .descending {
      position: absolute;
      left: 7px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      transition: border-color 0.3s;
    }
    .ascending {
      top: 5px;
      border-bottom-color: #c0c4cc;
    }
    .descending {
      bottom: 7px;
      border-top-color: #c0c4cc;
    }
  }
  .ascending-active .ascending {
    border-bottom-color: #409eff;
  }
  .descending-active .descending {
    border-top-color: #409eff;
  }
</style>
