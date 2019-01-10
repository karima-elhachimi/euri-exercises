/* eslint-disable */
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
    ],
  },
  plugins: [
    // show friendly build errors
    new FriendlyErrorsWebpackPlugin(),
  ],
  resolve: {
    // allow import of js and jsx files
    extensions: ['.js', '.jsx', '.scss'],
  },
  // limit verbose logging
  stats: {
    assets: true,
    modules: false,
    children: false,
  },
  devServer: {
    quiet: true,
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'src',
  },
};
