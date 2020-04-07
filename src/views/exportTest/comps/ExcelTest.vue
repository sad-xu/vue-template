<template>
  <div>
    <p class="header">
      <el-button
        v-if="hasPermission('EXPORT_EXCEL')"
        v-log="{ action: 'export excel' }"
        @click="doExportExcel">
        Export To Excel
      </el-button>
    </p>
    <table class="table">
      <tr
        v-for="(row, rowIndex) in tableData" :key="rowIndex"
        :class="rowIndex === 0 ? 'bold' : ''">
        <td
          v-for="(cell, cellIndex) in row" :key="cellIndex"
          :rowspan="rowIndex === 2 && cellIndex === 2 ? 2 : false"
          :colspan="rowIndex === 2 && cellIndex === 2 ? 2 : false"
          :style="
            (rowIndex === 2 && cellIndex === 3) ||
              (rowIndex === 3 && cellIndex === 2) ||
              (rowIndex === 3 && cellIndex === 3) ? 'display: none;' : ''">
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
        border: [
          [[0, 0], [9, 0]],
          [[0, 0], [0, 9]]
        ],
        merge: [
          [[2, 2], [3, 3]]
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    text-align: center;
  }

  .table {
    border-collapse: collapse;
    border: 1px solid #eee;
    margin: 20px auto;
    tr,
    td {
      padding: 10px;
      border: 1px solid #eee;
      text-align: center;
    }
    tr {
      & > :first-child {
        border-left: 1px solid #000;
        border-right: 1px solid #000;
      }
      &:first-of-type > :first-child {
        border-top: 1px solid #000;
      }
      &:last-of-type > :first-child {
        border-bottom: 1px solid #000;
      }
      &:first-of-type {
        > td {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
        }
        > td:last-of-type {
          border-right: 1px solid #000;
        }
      }
    }
  }

  .bold {
    font-weight: bold;
  }
</style>
