const express = require('express');

const app = express();

app.get('/test', (req, res, next) => {
    next();
    console.log(1);
    
    res.end('111')
})

app.get('/test', (req, res, next) => {
    console.log(2);
})


app.listen(3000, () => {
    console.log('3000')
})