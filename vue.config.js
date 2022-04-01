module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? '/sputterpm'
      : '/',
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/bsputterpm": {
        target: "http://127.0.0.1:8181/bsputterpm",
        changeOrigin: true,
        pathRewrite: {
          "^/bsputterpm": "",
        },
      },
    },
  }
}
