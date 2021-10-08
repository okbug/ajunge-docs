const url = require('url');
const request = {
    get url(){ // Object.defineProperty 属性访问器
        return this.req.url
    },
    get path(){
        return url.parse(this.url).pathname;
    },
    get query(){
        return url.parse(this.url,true).query;
    }
}


module.exports = request;