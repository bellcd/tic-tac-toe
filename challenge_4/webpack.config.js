const path = require('path');

// TODO: add babel through a loader in webpack, instead of directly ...
module.exports = {
  entry: "./public/app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development"
}