<template>
  <div class="terminology">
    <header>
      <el-row>
        <el-button size="mini" @click="onAdd">新增</el-button>
      </el-row>
    </header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in terminologyList" :key="item._id">
          <span>{{`${index+1}. `}}</span>
          <span>{{item.name}}</span>
          <span>
            <el-button size="mini" @click="onEdit(index)">编辑</el-button>
          </span>
        </li>
      </ul>
    </div>

    <el-dialog
      :title="dialogtitle"
      :visible="dialogVisible"
      width="50%"
      center
      @close="closeDialog"
    >
      <el-row style="minHeight:380px">
        <div style="marginBottom:5px" :key="index" v-for="(item,index) in curKeywordsList">
          <SelectTree
            ref="selecttree"
            :treeData="keywordsList"
            :id="item.elementId"
            @treeSelect="onTreeSelect($event,index)"
          />
          <el-button size="mini" style="margin-left:10px" @click="onDelTreeSelect(index)">删除</el-button>
        </div>
        <el-button size="mini" v-if="addFlag" @click="onAddTreeSelect">新增词条</el-button>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onConfirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectTree from "@/components/SelectTree.vue";

export default {
  name: "terminology",
  components: {
    SelectTree: SelectTree
  },
  data() {
    return {
      //本地模拟数据,实际应该从java接口获得
      terminologyList: [
        { _id: 0, name: "术语1", keywords: ["1", "2"] },
        { _id: 1, name: "术语2", keywords: ["1"] }
      ],
      //本地模拟数据，实际应该从java接口获得
      keywordsList: [
        { id: "1", text: "词条1" },
        { id: "2", text: "词条2" },
        { id: "3", text: "词条3" }
      ],

      //dialog
      dialogVisible: false,
      dialogMode: "", // 'edit' or 'add'
      dialogIndex: -1,
      curKeywordsList: [{ elementId: "" }],
      addFlag: true
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if ("edit" == this.dialogMode) {
          this.addFlag = true;
        } else {
          this.addFlag = false;
        }
      }
    }
  },
  computed: {
    dialogtitle() {
      return "edit" == this.dialogMode ? "编辑术语" : "新增术语";
    }
  },
  methods: {
    onAdd() {
      this.curKeywordsList = [{ elementId: "" }];
      this.dialogMode = "add";
      this.dialogVisible = true;
    },
    onEdit(index) {
      this.curKeywordsList = this.terminologyList[index].keywords.map(item => {
        return {
          elementId: item
        };
      });
      this.dialogMode = "edit";
      this.dialogIndex = index;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    onConfirmAdd() {
      // 调用java接口新增术语并刷新列表 这里直接改变本地的模拟数据
      console.log(this.curKeywordsList);
      if ("add" == this.dialogMode) {
        var addObj = {
          _id: this.terminologyList.length,
          name: `术语${this.terminologyList.length + 1}`,
          keywords: this.curKeywordsList
            .filter(item => {
              return item.elementId && item.elementId != "";
            })
            .map(item => {
              return item.elementId;
            })
        };
        this.terminologyList = [...this.terminologyList, addObj];
      } else if ("edit" == this.dialogMode) {
        this.terminologyList[this.dialogIndex].keywords = this.curKeywordsList
          .filter(item => {
            return item.elementId && item.elementId != "";
          })
          .map(item => {
            return item.elementId;
          });
      } else {
      }

      this.$message({
        message: "保存成功!"
      });
      this.closeDialog();
    },
    onTreeSelect(datax, index) {
      console.log(datax, index);

      if (index < this.curKeywordsList.length) {
        // 需要排除自己
        var isRepeat = false;
        for (let i = 0; i < this.curKeywordsList.length; i++) {
          if (
            i != index &&
            this.curKeywordsList[i].elementId == datax.data.id
          ) {
            isRepeat = true;
          }
        }
        if (isRepeat) {
          //表示有重复
          this.$message({
            message: "关键词重复，请重新选择!",
            type: "warning"
          });
          this.curKeywordsList[index].elementId = "";
          this.$refs.selecttree[index].forceUpdateOptions();
          if (index + 1 == this.curKeywordsList.length) {
            this.addFlag = false;
          }
        } else {
          //没有重复
          // 如果选择的是最后一个tree-select，则在下面添加一个新的tree-select
          if (index + 1 == this.curKeywordsList.length) {
            this.curKeywordsList = [...this.curKeywordsList, { elementId: "" }];
            this.addFlag = false;
          }

          // 将选择的id保存
          this.curKeywordsList[index].elementId = datax.data.id;
        }
      }
    },
    onDelTreeSelect(index) {
      if (this.curKeywordsList.length <= 1) {
        this.$message({
          message: "无法删除，术语必须至少包含一组关键词!",
          type: "warning"
        });
      } else {
        this.curKeywordsList.splice(index, 1);
      }
    },
    onAddTreeSelect() {
      this.curKeywordsList = [...this.curKeywordsList, { elementId: "" }];
      this.addFlag = false;
    }
  }
};
</script>
<style lang="scss">
.terminology {
  ul {
    list-style: none;
    height: 20px;
    li {
      height: 30px;
      margin: 10px 0;
      & > span:nth-child(1) {
        display: inline-block;
        width: 20px;
      }
      & > span:nth-child(2) {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
</style>
