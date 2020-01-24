const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT || 4200;
const PROD = process.env.NODE_ENV === 'production';
const DEPLOY_URL = process.env.URL || 'http://localhost:4200';

module.exports = {
  mode: PROD ? 'production' : 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: DEPLOY_URL,
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
  devtool: PROD ? 'source-map' : 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'dist/assets/'),
      },
    ]),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEPLOY_URL': JSON.stringify(process.env.URL),
    }),
  ],
  devServer: {
    host: 'localhost',
    contentBase: path.resolve(__dirname, 'src/'),
    port: PORT,
    open: false,
    historyApiFallback: true,
    stats: 'minimal',
  },
};
