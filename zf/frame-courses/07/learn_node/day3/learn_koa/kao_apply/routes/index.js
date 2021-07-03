let combine = require('koa-combine-routers');

let homeRouter = require('./homeRouter');
let UserRouter = require('./userRouter');

module.exports = combine(homeRouter, UserRouter)