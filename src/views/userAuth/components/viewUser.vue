<template>
  <el-dialog title="详情" :visible="show" @close="show = false">
    <el-form>
      <el-form-item label="名字" label-width="80px">
        {{data.name}}
      </el-form-item>

      <el-form-item label="用户类型" label-width="80px">
        {{data.user_type}}
      </el-form-item>

      <el-form-item label="头像地址" label-width="80px">
        {{data.avatar_url}}
      </el-form-item>

      <el-form-item label="手机号" label-width="80px">
        {{data.phone}}
      </el-form-item>

      <el-form-item label="是否删除" label-width="80px">
        {{data.is_delete}}
      </el-form-item>

      <el-form-item label="创建日期" label-width="80px">
        {{data.create_at}}
      </el-form-item>

      <el-form-item label="更新日期" label-width="80px">
        {{data.update_at}}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "viewUser",
  props: {
    value: Boolean,
    data: Object
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
  }
};
</script>
