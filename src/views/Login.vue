<template>
    <div class="login">
        <div class="img-wrap">
           <img src="../assets/logo.png" alt="">
        </div>

        <el-form :model="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      console.log(this.loginForm);
      const { username, password } = this.loginForm;
      if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.$notify({
          title: '提示',
          message: '登录成功！',
          type: 'success',
        });
        setTimeout(() => {
          this.$router.replace('/');
        }, 1000);
      } else {
        this.$notify({
          title: '警告',
          message: '请输入用户名、密码',
          type: 'warning',
        });
      }
    },
  },
};
</script>
<style lang="scss">
.login {
  .img-wrap {
    width: 200px;
    margin: 100px auto 20px auto;
    padding-left: 100px;
    img {
      width: 100%;
    }
  }
  .el-form {
    width: 400px;
    margin: 0 auto;
  }
  .el-button {
    width: 100%;
  }
}
</style>
