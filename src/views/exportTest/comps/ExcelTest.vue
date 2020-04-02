<template>
  <div>
    <el-button
      v-if="hasPermission('EXPORT_EXCEL')"
      v-log="{ action: 'export excel' }"
      @click="doExportExcel">
      Export To Excel
    </el-button>
  </div>
</template>

<script>
import { exportExcel } from '@/utils/export'

export default {
  methods: {
    doExportExcel() {
      exportExcel({
        filename: 'aaa',
        data: [['a', 'b', 'c'], [1, 2, 3], [4, 5, 6]]
      })
    }
  }
}
</script>
