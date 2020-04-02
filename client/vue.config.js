module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/scss/fonts.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/ws/': {
        target: 'ws://localhost:4000',
        secure: false,
        ws: true,
      }
    }
  }
}
