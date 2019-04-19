<template>
  <el-popover v-bind="$attrs" trigger="click" v-model="visible">
    <el-tree
      :check-strictly="true"
      :default-expanded-keys="arrayValue"
      ref="tree"
      :data="treeData"
      @node-click="handlerNodeClick"
      :show-checkbox="isShowCheckBox"
      :highlight-current="true"
      node-key="id"
      :props="defaultProps"
      @check="handlerCheck"
    >
    </el-tree>
    <el-input
      class="select"
      readonly
      v-model="showInputData"
      slot="reference"
      @click="visible = !visible"
      placeholder="请选择..."
    ></el-input>
  </el-popover>
</template>

<script>
import { ergodicData } from "@/utils/methods";
export default {
  props: {
    // 树形结构数据
    treeData: {
      type: Array,
      default: () => []
    },
    // 绑定值
    value: {
      type: [Number, Array, String],
      default: () => []
    }
  },
  data() {
    return {
      visible: false, // 树形显示与否
      defaultProps: {
        // 树形默认配置
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    expandTreeData() {
      return ergodicData(this.treeData);
    },
    showInputData() {
      if (this.value instanceof Array) {
        // 绑定数据为数组
        var temp = this.expandTreeData.filter(item => {
          return this.value.some(val => {
            return val === item.id;
          });
        });
        if (temp.length > 0) {
          return temp
            .map(item => {
              return item.label;
            })
            .join(",");
        } else {
          return "";
        }
      } else {
        // 绑定数据为单条字符串
        var temp2 = this.expandTreeData.find(item => {
          return item.id === this.value;
        });
        if (temp2) {
          return temp2.label;
        } else {
          return "";
        }
      }
    },
    // 将绑定值翻译为数组，element-tree使用
    arrayValue() {
      if (this.value instanceof Array) {
        return this.value;
      } else {
        return [this.value];
      }
    },
    isShowCheckBox() {
      return this.value instanceof Array;
    }
  },
  methods: {
    handlerCheck() {
      this.$emit("input", this.$refs.tree.getCheckedKeys());
    },
    handlerNodeClick(data) {
      if (!this.isShowCheckBox) {
        // 无复选框的模式才需要监听click事件
        this.$emit("input", data.id);
      }
    }
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(this.arrayValue);
    if (!this.isShowCheckBox) {
      this.$refs.tree.setCurrentKey(this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .select input {
  cursor: pointer;
}
</style>
