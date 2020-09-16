const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'main[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(eot|woff|ttf|svg|woff2)$/,
        use: ['file-loader?name=fonts/[name].[ext]'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader?name=images/[name].[ext]']
      },
      {
        test: /\.(ico)$/,
        use: ['file-loader?name=[name].[ext]']
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
