const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  chainWebpack(config) {
    const type = process.env.TYPE
    if (type !== 'lib') config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
}
