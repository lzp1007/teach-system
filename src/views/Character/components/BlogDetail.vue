<template>
  <div class="blog-detail-container">
    <h1>{{blog.title}}</h1>
    <div class="aside">
      <span>日期： {{blog.createDate}}</span>
      <span>浏览： {{ blog.scanNumber }}</span>
      <a href="#comment">评论：{{ blog.commentNumber }}</a>
      <RouterLink :to="{
        name: 'CharacterBlog',
        params: {
          categoryId: blog.category.id
        }}">{{ blog.category.name }}</RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import "@/styles/markdown.css"
import "highlight.js/styles/github.css"
import { updateScanNumber } from "@/api/blog";
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  async created() {
    //进入详情页之后，浏览量+1
    await updateScanNumber(this.blog.id);
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}

.markdown-body {
  margin: 2em 0;
}
</style>