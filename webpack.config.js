const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

scriptConfiguration = {
  entry: './src/index.ts',
  target: 'web',
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist/script'),
    library: "Script",
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
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
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
}

zerolibConfiguration = {
  entry: './src/zero/index.ts',
  target: 'web',
  mode: "production",
  output: {
    filename: "zero.js",
    path: path.resolve(__dirname, 'dist/zerolib'),
    library: "zero",
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

module.exports = [scriptConfiguration, zerolibConfiguration]
