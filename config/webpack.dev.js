const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')


let baseConfiguration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map'
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
