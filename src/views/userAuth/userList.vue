<template>
    <div>
        <el-form inline>
            <el-form-item :model="form" label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="text" @click="view">查看</el-button>
                    <el-button type="text" @click="edit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 查看 -->
        <el-dialog title="详情" :visible="editShow">
            <el-form>
                <el-form-item label="名字" label-width="80px">
                    <el-input v-model="editForm.name" ></el-input>
                </el-form-item>

                <el-form-item label="名字" label-width="80px">
                    <el-input v-model="editForm.name" ></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button @click="editShow = false">取消</el-button>
                <el-button type="primary" @click="editShow = false">确定</el-button>
            </div>
        </el-dialog>

         <!-- edit -->
        <el-dialog title="详情" :visible="viewShow">
            <el-form>
                <el-form-item label="名字" label-width="80px">
                    <span>{{viewForm.name}}</span>
                </el-form-item>

                <el-form-item label="名字" label-width="80px">
                    <span>{{viewForm.name}}</span>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button @click="viewShow = false">取消</el-button>
                <el-button type="primary" @click="viewShow = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'userList',
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
    };
  },
  methods: {
    getUserList() {
      const data = [
        {
          id: '123123',
          name: '张三',
        },
        {
          id: '8234',
          name: '李四',
        },
        {
          id: '8234',
          name: '李四',
        },
        {
          id: '8234',
          name: '李四',
        },
      ];

      this.tableData = data;
    },
    view() {
      this.viewShow = true;
      console.log('view');
    },
    edit() {
      this.editShow = true;
      console.log('edit');
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
