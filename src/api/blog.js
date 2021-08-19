import request from "./request";

/**
 * 获取博客列表数据
 * @param {*} page 
 * @param {*} limit 
 * @param {*} categoryid 
 * @returns 
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request().get("/api/blog", {
    params: {
      page,
      limit,
      categoryid
    }
  })
}

/**
 * 获取文章分类
 * @returns 
 */
export async function getBlogTypes() {
  return await request().get("/api/blogtype");
}

/**
 * 获取单个博客
 * @param {*} id 
 * @returns 
 */
export async function getBlog(id) {
  return await request().get(`/api/blog/${id}`)
}

//修改浏览量
export async function updateScanNumber(blogId) {
  return await request().put("/api/blog/scaner", {blogId});
}

/**
 * 提交评论
 * @param {*} commentInfo 
 * @returns 
 */
export async function postComment(commentInfo) {
  return await request().post("/api/comment", commentInfo);
}


/**
 * 分页获取评论
 * @param {获取评论} blogId 文章id
 * @param {*} page 页码
 * @param {*} limit 每次获取几条
 * @returns 
 */
export async function getComments(blogId, page = 1, limit = 10) {
  return await request().get("/api/comment", {
    params: {
      blogId,
      page,
      limit
    }
  })
}