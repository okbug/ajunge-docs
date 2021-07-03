module.exports = function (app) {
  app.get('/api/user/a', (req, res) => {
    res.json({
      username: 'a'
    })
  })
  app.get('/api/user/b', (req, res) => {
    res.json({
      username: 'b'
    })
  })
  app.get('/api/user/c', (req, res) => {
    res.json({
      username: 'c'
    })
  })
}