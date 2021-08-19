module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:12306"
      }
    },
    open: true
  },
  chainWebpack: config => {
    //.cur文件处理器
    config.module
      .rule('url-loader')
      .test(/\.(cur)$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  }
}