/* eslint-disable @typescript-eslint/no-var-requires */
const { WebpackPluginServe } = require('webpack-plugin-serve');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'dist'),
  devtool: 'eval-source-map',
  entry: [
    path.resolve(__dirname, 'src/index.tsx'),
    'webpack-plugin-serve/client',
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
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
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  plugins: [
    new Dotenv(),
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
    extensions: ['.json', '.mjs', '.js', '.ts', '.tsx'],
    fallback: { querystring: false },
  },
  watch: true,
};
