module.exports = function (app) {
  app.post('/api/home/a', (req, res) => {
    res.json({
      data: 'home'
    })
  })
  app.get('/api/home/b', (req, res) => {
    res.json({
      data: 'homeb'
    })
  })
  app.post('/api/home/c', (req, res) => {
    res.json({
      data: 'homec'
    })
  })
  app.get('/api/home/d', (req, res) => {
    res.json({
      data: 'homed'
    })
  })

}