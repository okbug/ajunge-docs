const webpack = require('webpack');
const config = require('./webpack.config');



const compiler = webpack(config);
console.log(compiler)
debugger
compiler.run((err, state) => {
    console.log(err);
    console.log(state.toJson({
        assets: true,
        chunks: true,
        modules: true,
        entries: true
    }))
})