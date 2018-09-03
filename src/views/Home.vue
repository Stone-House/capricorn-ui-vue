<template>
  <div class="home">
    <el-container>
      <el-aside :width="asideWidth">
        <menu-left :is-open="open"></menu-left>
      </el-aside>
      <el-container>
        <el-header>
          <i @click="toggle" v-if="!open" class="el-icon-d-arrow-left convert"></i>
          <i @click="toggle" v-else class="el-icon-d-arrow-right convert"></i>
          <ul class="profile">
            <li>
              <span>llccing,</span>
              <el-dropdown >
                <img class="mali" src="../assets/mali.png" alt="mojie">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
                <el-badge style="top: -10px;" :value="200" :max="99" class="item">
                  <img class="small" src="../assets/alert.png" alt="alert">              
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
            </li>
          </ul>
        </el-header>
        <el-main>
          Main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuLeft from '../components/menuLeft';
export default {
  name: 'home',
  components: {
    menuLeft,
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {
    asideWidth() {
      let width = '200px';
      if (this.open) {
        width = '65px';
      }
      return width;
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
      console.log('this.open', this.open);
    },
  },
};
</script>
<style lang="scss">
.home {
  .el-header {
    height: 60px;
    background-color: #1e9ff2;
    padding-left: 0;

    .convert {
      color: #fff;
      height: 40px;
      font-size: 36px;
      padding: 0 10px;
      cursor: pointer;
      border: 2px solid #fff;
      box-sizing: border-box;
      margin: 10px;
    }
  }
  .profile {
    margin: 0;
    padding: 0;
    float: right;
    li {
      list-style: none;
      display: inline-block;
      padding: 0 10px;

      img.mali {
        width: 50px;
        display: inline-block;
        border-radius: 50%;
        margin-top: 9px;
        cursor: pointer;
      }

      img.small {
        width: 30px;
        vertical-align: super;
        cursor: pointer;
      }
    }
  }
}
</style>
