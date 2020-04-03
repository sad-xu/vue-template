<template>
  <div>
    <el-button
      v-if="hasPermission('EXPORT_EXCEL')"
      v-log="{ action: 'export excel' }"
      @click="doExportExcel">
      Export To Excel
    </el-button>
    <table class="table">
      <tr
        v-for="(row, rowIndex) in tableData" :key="rowIndex"
        :class="rowIndex === 0 ? 'bold' : ''">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          {{ cell }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { exportExcel } from '@/utils/export'

export default {
  data() {
    return {
      tableData: [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      ]
    }
  },
  methods: {
    doExportExcel() {
      exportExcel({
        name: 'excel-test',
        data: this.tableData,
        bold: Array.from({ length: 10 }).map((item, index) => [0, index]),
        merge: [
          [[5, 1], [6, 2]],
          [[5, 7], [6, 8]]
        ],
        border: [
          [[1, 1], [2, 2]],
          [[3, 2], [4, 5]]
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    border-collapse: collapse;
    border: 1px solid #eee;
    margin: 20px auto;
    tr,
    td {
      padding: 10px;
      border: 1px solid #eee;
    }
  }

  .bold {
    font-weight: bold;
  }
</style>
