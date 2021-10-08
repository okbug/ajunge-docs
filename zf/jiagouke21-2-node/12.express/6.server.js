const express = require('./express');
const app = express();
const path = require('path');
const fs = require('fs')
// id:[fn1,fn2]  name:[fn1,fn2]
// keys  [id,name]

// fn1 -> fn2 -> fn1 -> fn2 -> callback
app.param('id', function(req, res, next, value, key) {
    console.log(value);
    next();
})
app.param('id', function(req, res, next, value, key) {
    console.log(value);
    next();
})
app.param('name', function(req, res, next, value, key) {
    console.log(value);
    next();
})
app.param('name', function(req, res, next, value, key) {
    console.log(value);
    next();
})
app.get('/user/:id/:name/xxx', function(req, res) {
    res.sendFile(path.resolve(__dirname,'note.md'));
})
app.listen(3000, function() {
    console.log(`server start 3000`);
})