const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV !== 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8111,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    contentBase: resolve('/static')
    // proxy: {
    //   '/v0.1': {
    //     target: '',
    //     changeOrigin: true,
    //     cookieDomainRewrite: {
    //       '': null
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      // scss全局变量 prependData
      scss: {
        data: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    let plugins = []
    if (isDev) {

    } else {
      plugins = [
        // 去除console
        new UglifyjsWebpackPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        }),
        // gZip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8
        })
        // 打包分析
        // new BundleAnalyzerPlugin()
      ]
    }
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('srv/views'))

    // svg-icon
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 清空HTML标签空格
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions.preserveWhitespace = true
    //     return options
    //   })
    //   .end()

    // 开发环境源码映射
    config
      .when(
        process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    // config
    //   .when(process.env.NODE_ENV !== 'development',
    //     config => {
    //       config
    //         .plugin('ScriptExtHtmlWebpackPlugin')
    //         .after('html')
    //         .use('script-ext-html-webpack-plugin', [{
    //           inline: /runtime\..*\.js$/
    //         }])
    //         .end()
    //       // config
    //       //   .optimization.splitChunks({
    //       //     chunks: 'all',
    //       //     cacheGroups: {
    //       //       libs: {
    //       //         name: 'chunk-libs',
    //       //         test: /[\\/]node_modules[\\/]/,
    //       //         priority: 10,
    //       //         chunks: 'initial' // only package third parties that are initially dependent
    //       //       },
    //       //       elementUI: {
    //       //         name: 'chunk-elementUI', // split elementUI into a single package
    //       //         priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //       //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //       //       },
    //       //       commons: {
    //       //         name: 'chunk-commons',
    //       //         test: resolve('src/components'), // can customize your rules
    //       //         minChunks: 3, //  minimum common number
    //       //         priority: 5,
    //       //         reuseExistingChunk: true
    //       //       }
    //       //     }
    //       //   })
    //       config.optimization.runtimeChunk('single')
    //     }
    //   )
  }
}
