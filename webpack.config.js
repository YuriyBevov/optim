const path = require('path');

module.exports = {
  mode: 'development', // сменив на production и запустив gulp build сделает минификацию js
  output: {
    filename: './js/bundle.min.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
