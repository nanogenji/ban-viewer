const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    proxy: {
      '/api': {
        target: 'https://api.bgm.tv',
        pathRewrite:{'^/api':''},
        ws: true,
        changeOrigin: true
      },
      '/bdapi': { // 匹配所有以 '/bdapi'开头的请求路径
          target: 'https://fanyi-api.baidu.com/api/trans/vip/translate', // 代理目标的基础路径
          changeOrigin: true, //说谎 用于控制请求头的host值
          pathRewrite: { '^/bdapi': '' },
          ws: true
      },
    }
  },

  lintOnSave: true
})