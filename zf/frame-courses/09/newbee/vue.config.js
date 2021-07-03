module.exports = {
  devServer: {
    // proxy: {
    //   // '/api': {
    //   //   target: '<url>',
    //   //   ws: true,
    //   //   changeOrigin: true
    //   // },
    //   // '/foo': {
    //   //   target: '<other_url>'
    //   // }

    // }
    proxy: 'http://backend-api-01.newbee.ltd'
  }
}