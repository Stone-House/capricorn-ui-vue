<template>
  <div class="login">
    <div class="img-wrap">
      <img src="../assets/logo.png" alt />
    </div>

    <el-form :model="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input @keyup.enter.native="login" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>

    <register :visible.sync="dialogVisible" />
  </div>
</template>
<script>
import cryptPwd, { getRandomSalt } from "@/utils/md5";
import register from "@/components/register";

export default {
  name: "login",
  components: {
    register
  },
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },

      dialogVisible: false
    };
  },
  methods: {
    login() {
      console.log(this.loginForm);
      const { name, password } = this.loginForm;
      if (name && password) {
        this.$store
          .dispatch("user/login", { name, password: cryptPwd(password) })
          .then(res => {
            localStorage.setItem("name", name);
            this.$router.replace("/");
          });
      } else {
        this.$notify({
          title: "提示",
          message: "请输入用户名、密码",
          type: "warning"
        });
      }
    },

    register() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
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
