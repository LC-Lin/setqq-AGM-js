const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let baseConfiguration = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          warnings: true,
          toplevel: true,
          keep_classnames: false,
          keep_fnames: false,
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
})

let scriptConfiguration = merge(baseConfiguration, {
  entry: {
    script: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist/script'),
    library: "Script",
  }
})

let zerolibConfiguration = merge(baseConfiguration, {
  entry: {
    zero: './src/zero/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist/zerolib'),
    library: "zero",
  }
})

module.exports = [scriptConfiguration, zerolibConfiguration]
