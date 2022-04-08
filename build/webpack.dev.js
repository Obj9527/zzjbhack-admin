const merge = require('webpack-merge');
const common = require('./webpack.common');
const mockServer = require('../mock/mock-server');
// proxy 可选

module.exports = merge(common, {
  // 开发环境不压缩代码，加快编译速度
  mode: 'development',
  // 提供源码映射文件，方便调试
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9002,
    open: true, // 编译完打开浏览器
    hot: true, // 热加载
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ''
    },
    before: require('../mock/mock-server.js') // devServer启动前执行mock-server.js
  }
})
