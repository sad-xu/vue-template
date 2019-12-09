<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#f5f5f5"
        text-color="#555"
        active-text-color="#409EFF"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item v-for="route in userRoutes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  components: {
    SidebarItem,
    Logo
  },
  data() {
    return {
      showLogo: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userRoutes'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
