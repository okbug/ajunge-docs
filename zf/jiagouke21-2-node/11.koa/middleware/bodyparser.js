// 编写功能时 我们一般会把功能封装函数 （高阶函数）， 作为插件来使用
const querystring = require('querystring');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
Buffer.prototype.split = function(sep){
    let arr = [];
    let len = Buffer.from(sep).length; // 分隔符可能是中文的， 取值的结果是字节的
    let offset = 0;
    while (-1 != (index = this.indexOf(sep,offset))) {
        arr.push(this.slice(offset,index));
        offset = index + len
    }
    arr.push(this.slice(offset))
     // 在二进制中查找 sep的位置
    return arr;
}


// console.log(querystring.parse('a=1&b=2')); // /([^=&?]+)=([^=&?]+)/
function bodyParser({dir} = {}) {
    return async (ctx, next) => { // 在最前定义的中间件肯定是优先执行
        ctx.request.body = await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function(chunk) {
                arr.push(chunk)
            })

            // 写接口的时候 我们会和后端沟通是传递 a=1&b=2 还是 {a:1} formdata格式

            // 微信支持 要求都是xml类型
            ctx.req.on('end', function() { // 尽量不要使用原生的req和res
                // 表单格式默认就是 key=value & key=value
                let type = ctx.get('Content-Type');
                let body = Buffer.concat(arr);
                if (type === 'application/x-www-form-urlencoded') { // 表单格式 
                    resolve(querystring.parse(body.toString()))
                } else if (type.startsWith('text/plain')) {
                    resolve(body.toString());
                } else if (type.startsWith('application/json')) {
                    resolve(JSON.parse(body.toString()));
                } else if(type.startsWith('multipart/form-data')) {
                    let boundary = '--' + type.split('=')[1];
                    // buffer 就是没有split
                    let lines = body.split(boundary).slice(1,-1);
                    let formData = {};
                    lines.forEach(line=>{
                      let [head,body] = line.split('\r\n\r\n'); // 规范中定义的 key 和 value之间有 这东西
                      head = head.toString();
                      let key = head.match(/name="(.+?)"/)[1]
                      if(head.includes('filename')){
                          // 文件需要放到服务器上
                          // 文件内容
                          let content = line.slice(head.length + 4, -2);
                          dir = dir || path.join(__dirname,'upload');
                          let filePath = uuid.v4();
                          let uploadUrl = path.join(dir,filePath);
                          // 图片的后缀可以自己识别
                          formData[key] = {
                              filename:uploadUrl,
                              size:content.length,
                          }
                          fs.writeFileSync(uploadUrl,content)
                      }else{
                        let value = body.toString();
                        formData[key] = value.slice(0,-2);
                      }
                    })
                    resolve(formData);
                }else{
                    resolve({})
                }
                // 用户提交的数据格式 有很多种类型 
                // 3种 1.json  2.表达格式 （1） 普通字符串  （2） 文件格式
            })
        });
        await next(); // 这个中间件 就是做一件事情，解析请求体，之后继续向下执行
    }
}
module.exports = bodyParser