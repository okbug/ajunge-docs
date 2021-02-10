let express = require('express');
const app = express();
app.use((req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   next();
});
app.get('/api/users',(req,res)=>{
  let offset = parseInt(req.query.offset);
  let limit = parseInt(req.query.limit);
  let result = [];
  for(let i=offset;i<offset+limit;i++){
      result.push({id:i+1,name:'name'+(i+1)});
  }
  res.json(result);
});
app.listen(8000);