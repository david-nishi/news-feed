/* eslint-env node */
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + "/build"
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({ 'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY),
      TOP_HEADLINES_URL: JSON.stringify(process.env.TOP_HEADLINES_URL),
      API_URL: JSON.stringify(process.env.API_URL)
    }})
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
            attrs: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              importLoaders: 1, 
              sourceMap: true 
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }

          }
        ]
      }
    ]
  }
};
