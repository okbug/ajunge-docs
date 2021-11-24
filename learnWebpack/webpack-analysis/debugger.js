const webpack = require('webpack');
const config = require('./webpack.config');
debugger
const compiler = webpack(config);
// console.log(compiler)
compiler.run((err, state) => {
    console.log(err);
    // console.log(state.toJson({
    //     assets: true,
    //     chunks: true,
    //     modules: true,
    //     entries: true
    // }))
})

// console.log(compiler.run)
console.log(compiler.hooks.done);