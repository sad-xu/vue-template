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
      <el-button :loading="loading" class="login-button" type="primary" @click="handleLogin()">
        Login
      </el-button>
      <!--  -->
      <div class="permission-test">
        <p class="tip">
          默认账号admin拥有所有功能
        </p>
        <span class="tip">测试角色：</span>
        <el-button @click="handleLogin(0b0111)">
          没有example2路由的角色
        </el-button>
        <el-button @click="handleLogin(0b1011)">
          没有导出Excel功能的角色
        </el-button>
        <p class="tip">
          体验功能，测试角色登陆后再刷新，会拥有所有权限
        </p>
      </div>
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
    handleLogin(level) {
      this.loading = true
      this.$store.dispatch('user/login', {
        // username,
        // password
        level
      }).then(() => {
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

  .permission-test {
    margin: 20px 0;
    .tip {
      font-size: 14px;
      color: #9e9e9e;
      margin: 5px 0;
    }
  }
</style>
