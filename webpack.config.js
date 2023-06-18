const path = require('path');

module.exports = {
  mode: 'development', //開発中はminifyされない設定
  entry: './src/util/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devtool: 'inline-source-map', 
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ],
  },
};