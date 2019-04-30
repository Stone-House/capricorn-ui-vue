<template>
  <div>
    <el-form inline>
      <el-form-item
        :model="form"
        label="姓名"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getUserList"
        >搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名字"
      ></el-table-column>
      <el-table-column
        prop="is_delete"
        label="是否已经删除"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="view(scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            @click="edit"
          >编辑</el-button>

          <el-button
          v-if="scope.row.is_delete === 1"
            type="text"
            @click="changeStatus(scope.row.id, 0)"
          >
          <span >启用</span>
          </el-button>

          <el-button
            v-else
            type="text"
            @click="changeStatus(scope.row.id, 1)"
          >
          <span style="color: red;">禁用</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <viewUser v-model="viewShow" :data="detaiData"></viewUser>

    <!-- edit -->
    <!-- <el-dialog
      title="详情"
      :visible="viewShow"
    >
      <el-form>
        <el-form-item
          label="名字"
          label-width="80px"
        >
          <span>{{viewForm.name}}</span>
        </el-form-item>

        <el-form-item
          label="名字"
          label-width="80px"
        >
          <span>{{viewForm.name}}</span>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="viewShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="viewShow = false"
        >确定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>
<script>
import viewUser from './components/viewUser';

export default {
  name: 'userList',
  components: {
    viewUser
  },
  data() {
    return {
      form: {
        name: '',
      },
      tableData: [],
      viewShow: false,
      viewForm: {
        name: 'zhangsan',
      },
      editShow: false,
      editForm: {
        name: '',
      },
      detaiData: {},
    };
  },
  methods: {
    getUserList() {
      this.$axios
        .get('/api/v1/users', {
          params: {
            page: 1,
            pageSize: 10,
          },
        })
        .then(resp => {
          if (resp.status === 200) {
            this.tableData = resp.data;
          }
        });
    },
    view(row) {
      this.viewShow = true;
      this.detaiData = row;
    },
    edit() {
      this.editShow = true;
      console.log('edit');
    },
    changeStatus(id, flag) {
      this.$confirm('确认操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios.post(`/api/v1/users/changeUserStatus`, {id,flag}).then(resp => {
            if (resp.status === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!',
              });

              this.getUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
