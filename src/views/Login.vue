<template>
  <div class="login">
    <div class="img-wrap">
      <img
        src="../assets/logo.png"
        alt=""
      >
    </div>

    <el-form
      :model="loginForm"
      label-width="100px"
    >
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          @click="login"
        >登录</el-button>
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
        name: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      console.log(this.loginForm);
      const { name, password } = this.loginForm;
      if (name && password) {
        this.$axios
          .post('/api/v1/users/login', { name, password })
          .then(resp => {
            console.log(resp)
            if (resp.status === 200) {
              this.$notify.success({
                title: '提示',
                message: '登录成功！',
              });

              localStorage.setItem('name', name);
              setTimeout(() => {
                this.$router.replace('/');
              }, 1000);
            }
          });
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
