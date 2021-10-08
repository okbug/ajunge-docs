const response = {
    _body:undefined,
    get body(){
        return this._body;
    },
    set body(value){
        // 用户调用ctx.body 的时候 会更改状态码
        this.res.statusCode = 200;
        this._body = value;
    }   
}


module.exports = response;