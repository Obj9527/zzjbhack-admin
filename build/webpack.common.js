const es6ExcludeRegExp = require('./es6ExcludeRegExp');
const { join: pathJoin } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InsertExternalJCsPlugin = require('./insertExternalJCs.plugin');
const packageName = require('../package.json').name;

const envConfig = require('../config/envConfig');
const webpack = require('webpack');
const moment = require('moment');
const currentTime = moment().format('YYYYMMDDHHmmssSSS');
const ENV_CONFIG = envConfig[process.env.NODE_ENV];

module.exports = {
  entry: {
    app: '.src/main.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  alias: {
    src: pathJoin(__dirname, '../src'),
    components: pathJoin(__dirname, '../src/components'),
    api: pathJoin(__dirname, '../src/api')
  },
  output: {
    // 输出文件的名字
    filename: '[name]~' + currentTime + '.js?v=[hash]',
    library: `${packageName}`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
    // 输出的绝对路径
    path: pathJoin(__dirname, `../dist/${process.env.NODE_ENV}`),
    publicPath: ENV_CONFIG.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: es6ExcludeRegExp
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
              }
            },
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 表示小于8kb的图片转为base64，大于8kb的是路径
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html', // 指定模板文件
      filename: 'index.html' // 指定输出的html文件名
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(), // 运行前删除dist目录
    new InsertExternalJCsPlugin(ENV_CONFIG.externalJCs),
    new webpack.DefinePlugin({
      ENV_CONFIG: JSON.stringify(ENV_CONFIG),
      API_URL_PREFIX: JSON.stringify(ENV_CONFIG.API_URL_PREFIX),
      PACKAGE_NAME: JSON.stringify(packageName)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

