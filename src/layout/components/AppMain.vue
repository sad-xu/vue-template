<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.app.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name && route.meta && route.meta.cache) {
          this.$store.dispatch('app/addCachedView', route)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.app-main {
  /* 50 = navbar   calc(100vh - 50px); */

  /* min-height: 100vh; */
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  margin-top: 50px;
  padding: 20px;
  background-color: #f5f7fa;
  overflow: auto;
}

/*
.fixed-header+.app-main {
  padding-top: 50px;
}
*/

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
