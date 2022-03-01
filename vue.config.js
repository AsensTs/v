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
  },
  configureWebpack: {
    plugins: [
    ],
  }
}