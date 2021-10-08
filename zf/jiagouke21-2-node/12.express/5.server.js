const express = require('./express');
const user = require('./routes/user')
const article = require('./routes/article')

const app = express();
app.use('/user',user)
app.use('/article',article)

app.listen(3000,function(){
    console.log(`server start 3000`)
})


