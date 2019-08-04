<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
    <el-form ref="form" :model="loginForm" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="loginForm.confirmPassword"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import cryptPwd, { getRandomSalt } from "@/utils/md5";
import api from "@/api/user";
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(newVal) {
        this.$emit("update:visible", newVal);
      }
    }
  },
  data() {
    return {
      loginForm: {
        name: "",
        phone: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名必填", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码必填", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "确认密码必填", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(flag => {
        if (flag) {
          const { name, phone, password, confirmPassword } = this.loginForm;
          if (password !== confirmPassword) {
            this.$notify({
              title: "提示",
              message: "请确认两次密码一致",
              type: "warning"
            });
            return;
          }

          let data = {
            name,
            password: cryptPwd(password),
            phone
          };
          api.createuser(data).then(resp => {
            if (resp.status === 200) {
              this.$notify({
                title: "提示",
                message: "注册成功！",
                type: "success"
              });
              this.dialogVisible = false
            }
          });
        } else {
          this.$notify({
            title: "提示",
            message: "请填写表单",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
