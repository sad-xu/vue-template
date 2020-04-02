<template>
  <div>
    <el-button
      v-if="hasPermission('EXPORT_IMG')"
      v-log="{ action: 'export img' }"
      @click="doExportImg">
      Export To Img
    </el-button>
  </div>
</template>

<script>
import { exportImg } from '@/utils/export'

export default {
  methods: {
    doExportImg() {
      exportImg({
        el: this.$el,
        name: 'img'
      })
    }
  }
}
</script>
