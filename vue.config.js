const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.bgm.tv',
        pathRewrite:{'^/api':''},
        ws: true,
        changeOrigin: true
      }
    }
  },

  lintOnSave: true
})