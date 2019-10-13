module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api/': {
        target: process.env.VUE_APP_API_PROXY,
        secure: false,
        changeOrigin: true,
      },
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
}
