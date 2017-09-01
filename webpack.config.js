const path = require('path');

module.exports = {
  entry: './src/angle.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  devServer: {
    watchContentBase: true,
    compress: true,
    port: 9090,
    open: true,
    openPage: './angle-example.html'
  },
  devtool: '#source-map'
};
