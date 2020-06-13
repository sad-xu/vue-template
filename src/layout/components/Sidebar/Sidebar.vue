<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
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
import { Scrollbar } from 'element-ui'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  components: {
    ElScrollbar: Scrollbar,
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
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
