<template>
  <el-dialog
    title="详情"
    :visible="show"
  >
    <el-form>
      <el-form-item
        label="名字"
        label-width="80px"
      >
        <el-input v-model="data.name"></el-input>
      </el-form-item>

      <el-form-item
        label="是否删除"
        label-width="80px"
      >
        <el-input v-model="data.is_delete"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="show = false">取消</el-button>
      <el-button
        type="primary"
        @click="show = false"
      >确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'viewUser',
  props: {
    value: Boolean,
    data: Object,
  },
  computed: {
    show:{
      get(){
        return this.value;
      },
      set(newVal){
        this.$emit('input', newVal)
      }
    }
  }
}
</script>
