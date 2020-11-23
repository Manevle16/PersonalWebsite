const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.jsx',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist'),
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react'],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
