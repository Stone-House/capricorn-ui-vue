<template>
  <el-dialog title="添加用户" :visible="show" @close="show = false">
    <!-- 添加的用户默认密码是123456 -->
    <el-alert type="warning" :closable="false">
      添加的用户默认密码是
      <strong>123456</strong>
    </el-alert>

    <el-form class="user-form" :rules="rules" ref="ruleForm" :model="userModel">
      <el-form-item prop="name" label="名字" label-width="80px">
        <el-input v-model="userModel.name"></el-input>
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
  name: "addUser",
  props: {
    value: Boolean
  },
  data() {
    return {
      userModel: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名必填", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 5 个字符", trigger: "blur" }
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
          let data = {
            password: 123456,
            confirmPassword: 123456
          };

          Object.assign(data, this.userModel);

          this.$axios.post("/api/v1/users", data).then(resp => {
            if(resp.status === 200){
              this.$notify.success("创建成功！");
              this.$emit('refresh')
              this.show = false;
            }
          })
        } else {
          this.$notify.error("请完善必填项！");
        }
      });
    }
  }
};
</script>
<style scoped>
.user-form {
  margin-top: 10px;
}
</style>
