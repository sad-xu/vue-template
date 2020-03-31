<template>
  <div>
    <h1>
      当前项目中的SVG图标
      <code class="code">npm run icon</code>
    </h1>
    <div class="icon-wrapper">
      <div v-for="path in SVGLIST" :key="path" class="icon-item">
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
      SVGLIST: /* xxx */['boluo', 'dianzhui', 'hamburger', 'huli', 'huolieniao', 'niao', 'password', 'shu-1', 'shu-2', 'shucong', 'shuye-1', 'shuye-2', 'shuye-3', 'shuye-4', 'shuye-5', 'shuye-6', 'shuzhi', 'user', 'xianrenzhang-1', 'xianrenzhang-2', 'xianrenzhang-3', 'xiaolu', 'xueshan']/* xxx */
    }
  }
}
</script>

<style lang="scss" scoped>
  .code {
    color: #d8638b;
  }

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
      &:hover .icon {
        transform: scale(1.5);
      }
      .icon {
        width: 60px;
        height: 60px;
        margin-bottom: 12px;
        transition: transform .5s;
      }
    }
  }
</style>
