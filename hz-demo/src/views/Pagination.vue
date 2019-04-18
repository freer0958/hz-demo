<template>
  <div class="pagination">
    <h1>前端分页demo</h1>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="index" label="index" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      origin_listData: [], //从接口获得的所有列表数据
      tableData: [], //table显示的数据，根据分页动态改变
      pageSize: 10,
      page: 1
    };
  },
  mounted() {
    //模拟从接口获取105条数据
    this.origin_listData = [...new Array(105)].map((item, index) => {
      return {
        index: `${index + 1}`,
        name: "王小虎",
        address: `上海市普陀区金沙江路 1518 弄${index + 1}`
      };
    });

    this.tableData = this.origin_listData.slice(
      this.pageSize * 0,
      this.pageSize
    );
  },
  computed: {
    total() {
      return this.origin_listData.length;
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.page = 1;
      this.tableData = this.origin_listData.slice(
        this.pageSize * 0,
        this.pageSize
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.tableData = this.origin_listData.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * (this.page - 1) + this.pageSize
      );
    }
  }
};
</script>
