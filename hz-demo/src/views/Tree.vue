<template>
  <div style="width:500px;padding:50px;">
    <my-select-tree
      v-for="(num,index) in 3"
      :key="index"
      :tree-data="treeData"
      v-model="forData[index]"
    ></my-select-tree>
    <my-select-tree :tree-data="treeData" v-model="strData"></my-select-tree>
  </div>
</template>

<script>
import { ergodicData } from "@/utils/methods";
import MySelectTree from "@/components/MySelectTree";
export default {
  name: "HelloWorld",
  components: {
    MySelectTree: MySelectTree
  },
  data() {
    return {
      strData: 5,
      forData: [[1, 5], [1, 2], [3, 7]],
      treeChecked: [1, 5],
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  computed: {
    expandTreeData() {
      return ergodicData(this.treeData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
