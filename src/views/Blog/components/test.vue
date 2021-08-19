<template>
  <div class="test-container">
    <RightList :list="list" @select="handleSelect"/>
  </div>   
</template>

<script>
import RightList from "./RightList"
export default {
  components: {
    RightList
  },
  methods: {
  handleSelect(item) {
    console.log(item)
  }
  },
  data() {
    return {
      list: [
        {name: "分类1", children: [
          {name: "1-1", isSelect: false},
          {name: "1-2", isSelect: true},
          {name: "1-3", children: [
            {name: "1-3-1", isSelect: false},
            {name: "1-3-2", isSelect: false}
          ], isSelect: false}
        ], isSelect: false},
        {name: "分类2", isSelect: false},
        {name: "分类3", isSelect: false},
        {name: "分类4", isSelect: false}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .test-container {
    width: 250px;
    height: 600px;
    border: 1px solid;
  }
</style>