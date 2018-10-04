const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.styl/,
        use: [
          MiniCssExPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          // 与autofixer一样基于browserlist，可以自定义适配的浏览器
          // babel的依赖安装参照npm上的参考命令安装，因为已经是7.x版本，如果直接用npm 散装会出依赖问题
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              preventExtract: true,
              wrapper: 'article',
              raw: true
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      // filename 的根路径为module.exports.output.path
      filename: './index.html',
    }),
    new MiniCssExPlugin({
      filename: 'styles.css'
    }),
    new webpack.BannerPlugin('Powerd by XXT, all done for Practice, not for enterprise'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map', // source-map
  devServer: {
    contentBase: './',
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // hot->热替换，不刷新页面，生效必须有plugin->webpack.HotModuleReplacementPlugin() 热替换
    // hot: true,
    open: true,
    // inline->热更新刷新浏览器
    // 如果配置了hot热替换，那么只有在热替换失败之后才会inline刷新浏览器
    // 所以如果hot热替换正常，那么就不会刷新浏览器，所以如果是对主代码的修改hot 没有替换，就不会刷新浏览器
    inline: true
  }
}

module.exports = config;