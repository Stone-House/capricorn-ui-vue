<template>
  <el-dialog title="编辑用户信息" :visible="show" @close="show = false">
    <!-- 添加的用户默认密码是123456 -->
    <el-alert type="warning" :closable="false">
      可以重置用户密码，默认会重置为
      <strong>123456</strong>
    </el-alert>

    <el-form class="user-form" :rules="rules" ref="ruleForm" :model="userModel">
      <el-form-item prop="name" label="名字" label-width="120px">
        <el-input v-model="userModel.name"></el-input>
      </el-form-item>
      <el-form-item prop="resetPass" label="是否重置密码" label-width="120px">
        <el-switch v-model="userModel.resetPass"></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "editUser",
  props: {
    value: Boolean,
    data: Object
  },
  data() {
    return {
      userModel: {
        id: '',
        name: "",
        resetPass: false
      },
      rules: {
        name: [
          { required: true, message: "用户名必填", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(flag => {
        if (flag) {
          // 如果选中重置，则重置密码

          let data = {};
          if (this.userModel.resetPass) {
            data = {
              password: 123456,
              confirmPassword: 123456
            };
          }

          Object.assign(data, this.userModel);
          delete data.resetPass
          console.log(data);
          this.$axios.put(`/api/v1/users/${data.id}`, data).then(resp => {
            if (resp.status === 200) {
              this.$notify.success("修改成功！");
              this.$emit("refresh");
              this.show = false;
            }
          });
        } else {
          this.$message.error("请完善必填项！");
        }
      });
    }
  },
  watch: {
    data() {
      // this.userModel = JSON.parse(JSON.stringify(this.data))
      Object.assign(this.userModel, this.data);
    }
  }
};
</script>
<style scoped>
.user-form {
  margin-top: 10px;
}
</style>
