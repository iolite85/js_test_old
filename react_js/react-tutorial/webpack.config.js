const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js',
  },

  devServer: {
    inline: true,
    port: 7777,
    contentBase: path.resolve(__dirname, 'public/'),
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
