const { WebpackPluginServe } = require('webpack-plugin-serve');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'dist'),
  entry: [
    path.resolve(__dirname, 'src/index.jsx'),
    'webpack-plugin-serve/client',
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  plugins: [
    new WebpackPluginServe({
      host: 'localhost',
      liveReload: true,
      open: true,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  watch: true,
};
