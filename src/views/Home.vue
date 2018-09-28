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

              <p class="name">
                Hello,<span>{{userName}}</span>
              </p>
              <el-dropdown >
                <img class="mali" src="../assets/mali.png" alt="mojie">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>日志查看</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
                <el-badge style="top: -10px;" :value="200" :max="99" class="item">
                  <img class="small" src="../assets/alert.png" alt="alert">
                </el-badge>
            </li>
          </ul>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuLeft from '../components/menuLeft.vue';

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
    userName() {
      const username = localStorage.getItem('username');
      return username;
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

      p.name {
        display: inline-block;
        position: relative;
        bottom: 16px;
        color: #fff;
        margin-right: 20px;
        span {
          font-weight: 700;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
