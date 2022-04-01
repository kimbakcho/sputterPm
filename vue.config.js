module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
          return {
            ...options,
            compilerOptions: {
              compatConfig: {
                MODE: 2
              }
            }
          }
        })
  },
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
