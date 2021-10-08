const express = require('../express')
const router = express.Router();

router.get('/add',function(req,res){ // /user/add   /user/add
    res.end('user add')
})
router.get('/remove',function(req,res){
    res.end('user remove')
})
module.exports = router