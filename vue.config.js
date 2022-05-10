const path = require('path')

function resolve(src) {
  return path.join(__dirname, src);
}

// webpack.config.js element-plus auto import
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@apis", resolve("./src/apis"))
      .set("@utils", resolve("./src/utils"))
      .set("@views", resolve("./src/views"))
      .set("@assets", resolve("./src/assets"))
      .set("@layout", resolve("./src/layout"))
      .set("@styles", resolve("./src/assets/styles"))
      .set("@components", resolve("./src/components"))
  },
  configureWebpack: {
    devServer: {
      port: 8099,
      proxy: {
        "/": {
          target: "http://192.168.3.106:8002/",
          // target: "http://192.168.3.17:8002/"
        }
      },
      hot: true
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
  }
}