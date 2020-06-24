<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <router-link key="collapse" class="sidebar-logo-link" to="/">
      <h1 class="sidebar-title">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'LOGO',
      logo: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    .sidebar-title {
      font-size: 28px;
      font-weight: bold;
      display: inline-block;
      font-family: -webkit-pictograph, sans-serif;
      background: linear-gradient(#36d1dc, #5b86e5);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: transform 0.3s;
      animation: logoBg 3s linear infinite reverse;
    }
  }

  &.collapse {
    .sidebar-title {
      transform: scale(0.6) rotate(-30deg) translate(-25%, -25%);
    }
  }
}

@keyframes logoBg {
  0% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
