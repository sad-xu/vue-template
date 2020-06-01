<template>
  <div>
    <h1>
      当前项目中的SVG图标
    </h1>
    <div class="icon-wrapper">
      <div v-for="path in svgList" :key="path" class="icon-item">
        <svg-icon class="icon" :icon-class="path"></svg-icon>
        <span>{{ path }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconList',
  data() {
    return {
      svgList: []
    }
  },
  created() {
    // 通过webpack require.context获取本地文件数据
    const requireContext = require.context('@/icons/svg', false, /\.svg$/)
    this.svgList = requireContext.keys().map(name => name.slice(2, -4))
  }
}
</script>

<style lang="scss" scoped>

  .icon-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 16%;
      font-size: 14px;
      padding: 15px 10px;
      .icon {
        width: 60px;
        height: 60px;
        margin-bottom: 12px;
        transition: transform 0.5s;
      }
      &:hover .icon {
        transform: scale(1.5);
      }
    }
  }
</style>
