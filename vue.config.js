const { resolve } = require("path");

module.exports = {
  transpileDependencies: ['vue-i18n'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      }
    },
    devServer: {
      port: 8080,
    }
  }
};