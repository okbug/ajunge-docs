function before(app) {
  app.get('/about/msg', function (req, res) {
    res.json({
      code: 0,
      msg: 'hahahahaha'
    })
  })

  app.post('/login', function (req, res) {
    console.log(5555)
    res.json({
      userLevel: 'supermaster',
      name: "珠峰",
      sex: 0,
      address: '国风美唐综合楼',
      userToken: '6666666666666666666'
    })
  })
}

module.exports = { before }