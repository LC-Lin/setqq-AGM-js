const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  target: 'web',
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.resolve(__dirname, '..'),
    //   verbose: true,
    // })
  ],
  output: {
    filename: "[name].js",
    libraryTarget: "umd2",
    umdNamedDefine: true,
    globalObject: "'undefined'!=typeof window?window:'undefined'!=typeof global?global:this"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
