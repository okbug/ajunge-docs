const Koa = require('./koa'); 

const app1  = new Koa(); 
const app2  = new Koa(); 
app1.use((ctx)=>{
    ctx.money = 100;
    console.log(ctx.money)
})
app2.use((ctx)=>{
    console.log(ctx.money)
})
app1.listen(3000,function(){
    console.log(`server start 3000`);
}) ;
app2.listen(4000,function(){
    console.log(`server start 4000`);
}) ;
