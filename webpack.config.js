const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT || 4200;
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: PROD ? 'production' : 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src/')],
        exclude: [path.resolve(__dirname, 'node_modules/'), path.resolve(__dirname, 'dist/')],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'src/')],
        exclude: [path.resolve(__dirname, 'node_modules/')],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: PORT,
    open: false,
    historyApiFallback: true,
    stats: 'minimal',
  },
};
