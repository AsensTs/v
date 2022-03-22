const path = require('path')

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
    devServer: {
      port: 8088,
      proxy: {
        "/": {
          target: "http://192.168.3.106:8002/",
        }
      },
      hot: true
    },
    plugins: [],
  }
}