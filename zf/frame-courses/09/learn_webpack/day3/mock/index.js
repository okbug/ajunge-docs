let user = require('./user')
module.exports = function (app) {
  app.get('/api/qq', function (request, response) {
    response.json({
      qqq: 234,
      www: 345
    })
  })
  app.post('/api/qq', function (request, response) {
    response.json({
      qqq: 234,
      www: 345
    })
  })
  user(app)
}