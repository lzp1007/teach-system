<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "./RightList"
import fetchData from "@/mixins/fetchData.js"
import {getBlogTypes} from "@/api/blog.js"
export default {
  mixins:[fetchData([])], 
  components: {
    RightList
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 20;
    },
    list() {
      const result = [
        ...this.data.filter((item) => {
          return item.name === "矿床";
        })
      ]

      return result.map(ele => {
        return {
          ...ele, 
          isSelect: ele.id === this.categoryId,
          aside: `${ele.articleCount}篇`
        }
      });
    }
  },
  methods:{
    async fetchData() {
      return await getBlogTypes();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        // 当前没有分类
        // /article?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "Character",
          query,
        });
      } else {
        // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "CharacterBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }       
    }
  },
  
}
</script>

<style lang="less" scoped>
.blog-category-container{
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  h2 {
    letter-spacing: 3px;
    font-size: 1.2em;
    margin: 0;
  }
}
</style>