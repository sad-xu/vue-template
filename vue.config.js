const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { chalk } = require('@vue/cli-shared-utils')
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
      // scss: {
      //   sassOptions: {
      //     data: `@import "~@/styles/variables.scss";`
      //   }
      // }
      scss: {
        /* eslint-disable-next-line */
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    let plugins = []
    if (isDev) {
      // 开发环境 自定义追加打印内容
      plugins = [
        (function() {
          function PrintText() {}
          PrintText.prototype.apply = compiler => {
            compiler.plugin('done', () => {
              console.log(`  ${chalk.bgWhiteBright.blue.bold(' vue-template ')}`)
            })
          }
          return new PrintText()
        })()
      ]
    } else {
      plugins = [
        // // 去除console
        // new UglifyjsWebpackPlugin({
        //   uglifyOptions: {
        //     warnings: false,
        //     compress: {
        //       drop_debugger: true,
        //       drop_console: true,
        //       pure_funcs: ['console.log']
        //     }
        //   },
        //   sourceMap: false,
        //   parallel: true
        // }),
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

    // 去除 console
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })

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

    // 开发环境源码映射
    // config
    //   .when(
    //     process.env.NODE_ENV === 'development',
    //     config => config.devtool('cheap-source-map')
    //   )
  }
}
