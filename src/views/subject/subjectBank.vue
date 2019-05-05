<template>
  <div>
    <el-form inline>
      <!-- <el-form-item :model="form" label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="getList(objPage)">搜索</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="success" @click="addUser">添加新用户</el-button>
      </el-form-item>
    </el-form>

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
        @current-change="getList(objPage)"
        background
        layout="prev, pager, next, total"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "subjectbank",
  data() {
    return {
      tableData: [],
      objPage: {
        page: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  methods: {
    getList({ page = 1, pageSize = 10 }) {
      this.$axios
        .get("/api/v1/subjectBank", {
          params: {
            page,
            pageSize
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            this.total = resp.data.total;
            this.tableData = resp.data.list;
          }
        });
    },

    pageSizeChange(paegSize) {
      this.getList(this.objPage);
    },
  },
  mounted() {
    this.getList(this.objPage);
  }
};
</script>
