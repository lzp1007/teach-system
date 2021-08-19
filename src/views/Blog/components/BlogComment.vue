<template>
  <div class="blog-comment-container" id="comment">
    <MessageArea 
      title="评论列表"  
      :sub-title="`(${data.total})`" 
      :list="data.rows" 
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea"
import fetchData from "@/mixins/fetchData.js"
import { getComments, postComment } from "@/api/blog.js"
export default {
  mixins: [fetchData({total: 0, rows: []})],
  components: {
    MessageArea
  },
  data(){
    return {
      page: 1,
      limit: 10,
      avatars: [ "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg"
      ]
    }
  },
  created(){
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    //是否还有数据可以拉取
    hasMore() {
      return this.data.rows.length < this.data.total;
    }
  },
  methods: {
    //滑到底部加载评论
    async handleScroll(dom) {
      if(this.isLoading || !dom) {
        //目前正在加载更多
        return;
      }
      const range = 100;   //定义一个范围，在这个范围内就表明到达了底部
      const dec = Math.abs((dom.scrollTop + dom.clientHeight) - dom.scrollHeight);
      if(dec < range ) {
        //到达了底部
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    //加载下一页
    async fetchMore(){
      if(!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const index = (Math.floor(Math.random()*(this.avatars.length - 1)));
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      const createDate = `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
      const avatar = this.avatars[index]
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
        avatar,
        createDate
      })
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功！");
    }
  }
}
</script>

<style>
  .blog-comment-container {
    margin: 30px 0;
  }
</style>