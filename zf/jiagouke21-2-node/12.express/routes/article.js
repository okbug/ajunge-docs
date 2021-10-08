const express = require('../express')
const router = express.Router();
router.get('/add1',function(req,res){
    res.end('article add')
})
router.get('/remove1',function(req,res){
    res.end('article remove')
})

module.exports = router