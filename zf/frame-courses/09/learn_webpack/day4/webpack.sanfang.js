let path = require('path')
let webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    sanfang: ['vue', 'loadsh', 'jquery']
  },
  output: {
    filename: "dll_[name].js",
    path: path.resolve(__dirname, 'dist'),
    library: 'dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}