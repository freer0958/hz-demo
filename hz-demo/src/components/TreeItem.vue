<template>
  <div :class="typeClass">{{label}}</div>
</template>
<script>
export default {
  props: {
    type: {
      type: Number
    },
    label: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed:{
      typeClass(){
          return `type_${this.type}`
      }
  }
};
</script>
<style  scoped>
.type_1{
    color: #000;
}
.type_2{
    color: #8d8d8d;
}
.type_3{
    color: #c8c8c8;
}
</style>


