<template>
  <div class="wrapper">
    <div class="login-wrapper">
      <span class="logo">
        LOGIN
      </span>
      <div class="login-item">
        <svg-icon class="icon" icon-class="user"></svg-icon>
        <el-input
          v-model="username"
          placeholder="Username"
          type="text">
        </el-input>
      </div>
      <div class="login-item">
        <svg-icon class="icon" icon-class="password"></svg-icon>
        <el-input
          v-model="password"
          type="password">
        </el-input>
      </div>
      <el-button :loading="loading" class="login-button" type="primary" @click="handleLogin">
        Login
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      username: 'admin',
      password: '111111'
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #f1f1f1;
    height: 100%;
  }
  .login-wrapper {
    width: 500px;
    margin: 0 auto;
    padding-top: 150px;
    .logo {
      display: inline-block;
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 20px;
      border-bottom: 2px solid #5f5f5f;
      color: #5f5f5f;
    }
    .login-item {
      position: relative;
      margin-bottom: 25px;
      .icon {
        position: absolute;
        height: 46px;
        margin-left: 12px;
        z-index: 1;
      }
      /deep/ .el-input__inner {
        height: 46px;
        line-height: 46px;
        padding-left: 38px;
        &:focus {
          border-color: #5f5f5f;
        }
      }
    }
    .login-button {
      width: 100%;
      height: 40px;
      background-color: #5f5f5f;
      border-color: #9e9e9e;
      &:hover {
        background-color: #777;
      }
    }
  }
</style>
