module.exports = {
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    extract: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: "[local]_[hash:5]"
        }
      }
    }
  },
  devServer: {
    port: 100

  }
}