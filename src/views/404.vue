<template>
  <div>
    404
    <el-button @click="goBack">
      返回前页
    </el-button>
  </div>
</template>

<script>
export default {
  name: '404',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
