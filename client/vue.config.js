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
  chainWebpack: config => {
    config.plugin('preload').tap(options => {
      options[0].as = (entry) => {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff|ttf|otf)$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      }
      options[0].include = 'allAssets'
      return options
    })
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
