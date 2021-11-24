const webpack = require('./webpack');
const options = require('./webpack.config');
const compiler = webpack(options);
//4.执行compiler对象的 run 方法开始执行编译
compiler.run((err, stats) => {
    console.log(err);
    console.log(stats.toJson());
});


