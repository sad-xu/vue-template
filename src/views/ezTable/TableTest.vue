<template>
  <div class="wrapper">
    <h1>Ez-Table v0.3</h1>
    <div class="desc">
      <p class="title">
        Table Attributes
      </p>
      <table>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
        </tr>
        <tr>
          <td>table-header-data</td>
          <td>表头标题数据</td>
          <td>[{ label, prop: String, width, fixed, sortable }]</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>label 标题 String</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>prop 属性名 String</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>width 列宽 String</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>fixed 是否固定在左侧 String</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>sortable 是否排序 Boolean</td>
        </tr>
        <tr>
          <td>table-body-data</td>
          <td>主体数据</td>
          <td>
            [{ props: value }]
          </td>
        </tr>
        <tr>
          <td>infinite-scroll</td>
          <td>是否开启无限滚动</td>
          <td>
            Boolean false
          </td>
        </tr>
        <tr>
          <td>infinite-scroll-delay</td>
          <td>滚动加载更多事件节流延时 TODO: bug</td>
          <td>
            Number (200ms)
          </td>
        </tr>
        <tr>
          <td>infinite-scroll-distance</td>
          <td>滚动加载更多事件触发距离阈值</td>
          <td>
            Number (0px)
          </td>
        </tr>
      </table>
      <p class="title">
        Table Events
      </p>
      <table>
        <tr>
          <th>事件名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
        <tr>
          <td>@sortChange</td>
          <td>排序事件</td>
          <td>{ prop, order }</td>
        </tr>
        <tr>
          <td>@rowClick</td>
          <td>行点击事件</td>
          <td>row, index</td>
        </tr>
        <tr>
          <td>@loadMore</td>
          <td>滚动加载更多事件</td>
          <td>-</td>
        </tr>
      </table>
      <p class="title">
        Table Slot
      </p>
      <table>
        <tr>
          <th>用法</th>
          <th>说明</th>
        </tr>
        <tr>
          <td>v-slot:prop="{ row }"</td>
          <td>自定义单元格内容</td>
        </tr>
      </table>
    </div>
    <ez-table
      :table-header-data="tableHeaderData" :table-body-data="tableBodyData"
      infinite-scroll :infinite-scroll-delay="200" :infinite-scroll-distance="100"
      class="table-wrapper"
      @loadMore="handleLoadMore"
      @sortChange="handleSortChange"
      @rowClick="handleRowClick">
      <template v-slot:prop-1="{ row }">
        <span style="font-weight: bold;">{{ row['prop-1'] }}</span>
      </template>
      <template v-slot:prop-3="{ row }">
        <el-button>{{ row['prop-3'] }}</el-button>
      </template>
      <template v-slot:prop-4="{ row }">
        <span style="color:red;">{{ row['prop-4'] }}</span>
      </template>
    </ez-table>
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
      tableHeaderData: Array.from({ length: 40 }).map((item, i) => ({
        label: `index-${i}`,
        prop: `prop-${i}`,
        width: 100,
        // 是否固定
        fixed: i <= 1,
        // 是否可排序
        sortable: Boolean(Math.random() > 0.5)
      })),
      tableBodyData: Array.from({ length: 20 }).map((d, index) => {
        let obj = {}
        for (let i = 0; i < 40; i++) {
          obj[`prop-${i}`] = `item-${i}-${index}`
        }
        return obj
      })
    }
  },
  methods: {
    // 外部手动排序
    handleSortChange({ order, prop }) {
      if (order === 'ascending') {
        this.tableBodyData.sort(() => Math.random() - 0.5)
      } else if (order === 'descending') {
        this.tableBodyData.sort(() => Math.random() - 0.5)
      }
    },
    // 行点击事件
    handleRowClick(row, index) {
      console.log(row, index)
    },
    // 加载更多事件
    handleLoadMore() {
      let startIndex = this.tableBodyData.length
      this.tableBodyData = this.tableBodyData.concat(Array.from({ length: 20 }).map((d, index) => {
        let obj = {}
        for (let i = 0; i < 40; i++) {
          obj[`prop-${i}`] = `item-${i}-${index + startIndex}`
        }
        return obj
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #eee;
    padding-bottom: 80px;
  }

  h1 {
    padding: 2% 0 0 2%;
  }
  .desc {
    display: flex;
    flex-direction: column;
    padding: 1% 2% 2% 2%;
    .title {
      font-family: -webkit-pictograph;
      color: grey;
    }
    table {
      font-size: 14px;
      border-bottom: 1px solid #9e9e9e;
      margin-bottom: 5px;
      padding-bottom: 5px;
      th {
        text-align: left;
      }
    }
  }

  .table-wrapper {
    width: 80%;
    margin-left: 10%;
    height: 500px;
  }
</style>
