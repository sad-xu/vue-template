<template>
  <div class="sidebar-container">
    <logo :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#fff0"
        text-color="#fff"
        active-text-color="#fff"
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

<style lang="scss" scoped>
  .sidebar-container /deep/ {
    width: $sideBarWidth !important;
    background-color: #f5f5f5;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    transition: width 0.28s;
    overflow: hidden;
    background-image: linear-gradient(45deg, #780206, #061161);
    background-repeat: repeat-x;
    box-shadow:
      2px 10px 30px 0 rgba(0, 0, 0, 0.42),
      0 4px 25px 0 rgba(0, 0, 0, 0.12),
      0 8px 10px -5px rgba(0, 0, 0, 0.2);
    // reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0;
    }

    .el-scrollbar {
      height: calc(100% - 50px);
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
      transform: scale(2.5);
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }

    // menu hover
    // .submenu-title-noDropdown,
    // .el-submenu__title {
    //   &:hover {
    //     background-color: rgba(200, 200, 200, 0.2) !important;
    //   }
    // }

    .is-active > .el-submenu__title {
      color: #555 !important;
    }

    & .el-submenu > .el-submenu__title,
    & .el-menu-item {
      min-width: $sideBarWidth;
      background-color: transparent !important;
      &:hover {
        background-color: rgba(200, 200, 200, 0.2) !important;
      }
    }
  }
</style>
