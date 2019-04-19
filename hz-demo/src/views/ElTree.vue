<template>
  <el-tree :data="data" :props="defaultProps" default-expand-all>
    <div slot-scope="{ node, data }">
      <tree-item :type="data.type" :label="data.label"></tree-item>
    </div>
  </el-tree>
</template>

<script>
import TreeItem from '@/components/TreeItem.vue'
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          type: 1,
          children: [
            {
              id: 4,
              label: "二级 1-1",
              type: 2,

              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  type: 3
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  type: 3
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          type: 1,

          children: [
            {
              id: 5,
              label: "二级 2-1",
              type: 2
            },
            {
              id: 6,
              label: "二级 2-2",
              type: 2
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          type: 1,

          children: [
            {
              id: 7,
              label: "二级 3-1",
              type: 2
            },
            {
              id: 8,
              label: "二级 3-2",
              type: 2
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components:{
      TreeItem:TreeItem
  }
};
</script>
<style scoped>

</style>

