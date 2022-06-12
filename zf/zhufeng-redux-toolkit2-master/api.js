let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());
app.use((req,res,next)=>{
    setTimeout(()=>{
      if(false){
        next();
      }else{
        next('接口出错');
      }
    },1000);
});
let todos = [{id:1,text:"吃饭"},{id:2,text:"睡觉"}];
app.get('/todos/list',(_req,res)=>{
  res.json(todos);
});
app.get('/todos/detail/:id',(req,res)=>{
  let id = req.params.id;
  let todo = todos.find(item=>item.id === parseInt(id));
  res.json(todo);
});
app.listen(8080,()=>console.log(`服务在端口8080启动`));