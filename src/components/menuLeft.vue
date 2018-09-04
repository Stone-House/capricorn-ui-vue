<template>
    <div class="menu-left">
        <div :class="imgClass">
            <img alt="Vue logo" src="../assets/logo-mini.png">
        </div>
        
        <el-menu :router="true" class="el-menu-vertical-demo" :collapse="isOpen" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">权限管理</span>
                </template>

                <el-menu-item index="/user-list">用户列表</el-menu-item>
                <el-menu-item index="/about">角色列表</el-menu-item>
                <el-menu-item index="/about">资源列表</el-menu-item>
                <el-menu-item index="/about">日志列表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
  props: {
    isOpen: Boolean,
  },
  data(){
    return{
      open:true
    }
  },
  computed:{
    imgClass(){
      let classes = ['img-wrap'];
      if(this.isOpen){
        classes.push('img-wrap-collapse')
      }
      return classes
    }
  },
  methods:{
    handleOpen(){
      console.log('open')
    },
    handleClose(){
      console.log('close')
    },
  }
};
</script>

<style lang="scss">
.menu-left {
  .img-wrap {
    height: 60px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    
  }
  .img-wrap-collapse{
      width: 65px;
    }
  // .el-menu-vertical-demo:not(.el-menu--collapse) {
  //   width: 200px;
  //   min-height: 400px;
  // }

}
</style>
