module.exports = {
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
