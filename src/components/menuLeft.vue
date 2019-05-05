<template>
    <div class="menu-left">
        <div :class="imgClass">
            <img alt="Vue logo" src="../assets/logo-mini.png">
        </div>
        <div class="scrollbar-wrapper">
          <el-scrollbar wrap-class="scrollbar-class">
            <el-menu :router="true" class="el-menu-vertical-demo" :collapse="isOpen" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">权限管理</span>
                    </template>

                    <el-menu-item index="/user-list">用户列表</el-menu-item>
                </el-submenu>
                <el-submenu>
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">题目管理</span>
                    </template>
                    
                    <el-menu-item index="/subject-bank-list">题库</el-menu-item>
                </el-submenu>
            </el-menu>
          </el-scrollbar>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {
    imgClass() {
      const classes = ['img-wrap'];
      if (this.isOpen) {
        classes.push('img-wrap-collapse');
      }
      return classes;
    },
  },
  methods: {
    handleOpen() {
      console.log('open');
    },
    handleClose() {
      console.log('close');
    },
  },
  mounted() {},
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
  .img-wrap-collapse {
    width: 65px;
  }

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  // 滚动包裹
  .scrollbar-wrapper {
    position: fixed;
    top: 60px;
    bottom: 0;

    .el-scrollbar{
      height: 100%;
    }

    .el-menu{
      width: 200px;
      border-right: 0;
    }

    .el-menu--collapse{
      width: 64px;
    }

    // 内部滚动
    .scrollbar-class {
      overflow-x: hidden!important;
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
}
</style>
