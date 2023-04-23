const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 代理服务器解决跨域
  devServer: {
    proxy: {
      // 检测到请求URL中带/api，代理服务器就会介入工作
      '/api': {
        // 真实服务器（数据存放的）的url
        target: 'http://gmall-h5-api.atguigu.cn',
        // 二次封装的axios全部请求路径已经带了api，这里不需要重写路径
        // pathRewrite: {'^/api': ''}
      }
    }
  },
})
