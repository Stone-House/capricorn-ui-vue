<template>
  <div>
      <el-form inline>
        <!-- <el-form-item :model="form" label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="getUserList(objPage)">搜索</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="success" @click="addUser">添加新用户</el-button>
      </el-form-item>
    </el-form>

    <div>
      {{ isAdmin }}
    </div>
    
    <el-table :data="tableData">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="user_type" label="用户类型"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="is_delete" label="是否删除"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="view(scope.row)">查看</el-button>

          <el-button type="text" @click="edit(scope.row)">编辑</el-button>

          <el-button
            v-if="scope.row.is_delete === 1"
            type="text"
            @click="changeStatus(scope.row.id, 0)"
          >
            <span>启用</span>
          </el-button>

          <el-button v-else type="text" @click="changeStatus(scope.row.id, 1)">
            <span style="color: red;">禁用</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-wrap">
      <el-pagination
        :current-page.sync="objPage.page"
        :page-size.sync="objPage.pageSize"
        @size-change="pageSizeChange"
        @current-change="getUserList(objPage)"
        background
        layout="prev, pager, next, total"
        :total="total"
      ></el-pagination>
    </div>

    <viewUser v-model="viewShow" :data="detaiData"></viewUser>
    <addUser v-model="addShow" @refresh="getUserList(objPage)"></addUser>
    <editUser v-model="editShow" :data="detaiData" @refresh="getUserList(objPage)"></editUser>
  </div>
</template>
<script>
import viewUser from "./components/viewUser";
import addUser from "./components/addUser";
import editUser from "./components/editUser";
import { mapGetters } from 'vuex'
export default {
  name: "userList",
  components: {
    viewUser,
    addUser,
    editUser
  },
  data() {
    return {
      form: {
        name: ""
      },
      tableData: [],
      addShow: false,

      viewShow: false,
      viewForm: {
        name: "zhangsan"
      },

      editShow: false,
      editForm: {
        name: ""
      },

      detaiData: {},

      objPage: {
        page: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  computed: {
    ...mapGetters('user', {isAdmin: 'isAdmin'})
  },
  methods: {
    getUserList({ page = 1, pageSize = 10 }) {
      this.$axios
        .get("/api/v1/users", {
          params: {
            page,
            pageSize
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            this.total = resp.data.count;
            this.tableData = resp.data.list;
          }
        });
    },

    pageSizeChange(paegSize) {
      this.getUserList(this.objPage);
    },

    addUser(){
      this.addShow = true;
    },

    view(row) {
      this.viewShow = true;
      this.detaiData = row;
    },

    edit(row) {
      this.editShow = true;
      this.detaiData = row;
    },

    changeStatus(id, flag) {
      this.$confirm("确认操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`/api/v1/users/changeUserStatus`, { id, flag })
            .then(resp => {
              if (resp.status === 200) {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });

                this.getUserList(this.objPage);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getUserList(this.objPage);
  }
};
</script>
<style scoped>
.page-wrap {
  text-align: right;
  margin-top: 10px;
}
</style>
