const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./config/config.yml');

config.backend_url = process.env.REACT_APP_API_URL || 'https://api.example.liis.su/api';
config.expired_health_check_hours = process.env.EXPIRED_HEALTH_CHECK_HOURS || 20;

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 8192,
      //     name: '[name].[ext]',
      //     publicPath: 'assets'
      //   },
      // },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@emotion/babel-preset-css-prop']
            }
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: 'index.html', template: 'public/index.html', title: 'Caching' }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify({ ...config }),
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
  ]
};
