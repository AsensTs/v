const path = require('path')
// element-plus 自动导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

function resolve(src) {
  return path.join(__dirname, src);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@assets", resolve("./src/assets"))
      .set("@styles", resolve("./src/assets/styles"))
      .set("@views", resolve("./src/views"))
      .set("@components", resolve("./src/components"))
      .set("@utils", resolve("./src/utils"))
      .set("@apis", resolve("./src/apis"))
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}