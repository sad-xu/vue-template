<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <navbar></navbar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .main-container {
    // min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
    overflow: hidden;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar /deep/ {
    .fixed-header {
      width: calc(100% - 54px);
    }

    .sidebar-container {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px;
    }

    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;
      min-width: initial;
      .el-tooltip {
        padding: 0 !important;
        .svg-icon {
          margin-left: 20px;
        }
      }
    }

    .el-submenu {
      overflow: hidden;
      & > .el-submenu__title {
        padding: 0 !important;
        .svg-icon {
          margin-left: 20px;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-submenu {
        & > .el-submenu__title {
          & > span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
