let express = require('express');
let app = express();
app.get('/users/api/1',(req,res)=>{
  res.json([{id:1,name:'zhufeng'}]);
});
app.listen(3000);