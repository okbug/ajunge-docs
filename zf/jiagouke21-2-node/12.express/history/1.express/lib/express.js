
const Application = require('./application')


// 创建应用 每次express() 都能创建一个应用

function createApplication() {
    return new Application(); 
}

module.exports = createApplication