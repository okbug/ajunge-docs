let home = require('./home')

module.exports = function mock(app) {
  // app  是 webpack给的一个参数 
  app.get('/api/aaa', (request, response) => {
    // console.log(request)
    response.json({
      a: 123,
      b: 234
    })
  })

  home(app)
}