const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const mime = require('mime');
const os = require('os');
const chalk = require('chalk');
const { createReadStream, readFileSync } = require('fs');
const crypto = require('crypto');
const zlib = require('zlib')
const { render } = require('./util')
let address = Object.values(os.networkInterfaces()).flat().find(item => item.family == 'IPv4').address;

const template = readFileSync(path.resolve(__dirname, 'tmpl.html'), 'utf8');


module.exports = class MyServer {
    constructor(opts = {}) {
        this.port = opts.port;
        this.directory = opts.directory;
        this.address = address;
        this.template = template

    }
    handleRequest = async (req, res) => { // es7 实现更改this ， 低版本node不支持 (不支持可以采用es6箭头函数 或者bind)
        // 目录操作， 其他操作 文件操作 gzip

        // 请求到来的时候 需要监控路径，看一下路径是否是文件，如果是文件 直接将文件返回，如果不是文件则读取文件中的目录
        let { pathname } = url.parse(req.url);
        pathname = decodeURIComponent(pathname)
        let filePath = path.join(this.directory, pathname); // 在当前执行目录下进行查找
        try {
            let statObj = await fs.stat(filePath); // it.throw

            if (statObj.isDirectory(filePath)) {
                const dirs = await fs.readdir(filePath);
                // 我们希望通过模板引擎的方式来实现

                let content = await render(template, {
                    dirs: dirs.map(dir => ({
                        url: path.join(pathname, dir),
                        dir
                    }))
                });
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(content)
            } else {
                this.sendFile(req, res, statObj, filePath);
            }
        } catch (e) {
            // 文件不存在则发生错误
            this.sendError(res, e)
        }
    }
    gzip(req,res) {
        let encoding = req.headers['accept-encoding'];
        let zip;
        // 如果是图片就不要锁了
        if (encoding) { // 说明支持压缩个数
            let ways = encoding.split(', ');
            for (let i = 0; i < ways.length; i++) {
                let lib = ways[i];
                if (lib == 'gzip') {
                    res.setHeader('content-encoding', 'gzip')
                    zip = zlib.createGzip();
                    break;
                } else if (lib === 'deflate') {
                    res.setHeader('content-encoding', 'deflate')
                    zip = zlib.createDeflate();
                    break
                }
            }
        }
        return zip
    }
    cache(req,res,statObj,filePath){
        res.setHeader('Cache-Control','no-cache'); // 他表的是每次都来服务器来询问 缓存中有， no-store没有缓存
        // res.setHeader('Cache-Control','max-age=10'); // s 单位, 10s内我引用的其他资源不要在访问了
        // res.setHeader('Expires',new Date(Date.now() + 10 * 1000).toGMTString());

        // 有的文件 可能10s后  还是没有变， （我希望对比一下，如果文件没变 就接着找缓存去）


        // last-modified: Tue, 07 Jul 2020 03:31:44 GMT 服务器和浏览器说 此文件最后修改时间是多少
        // if-modified-since 浏览器下次访问的时候带过来的  （和压缩一样）

        const ifModifiedSince = req.headers['if-modified-since']
        const ctime = statObj.ctime.toGMTString();
        res.setHeader('last-modified',ctime);

        // if(ifModifiedSince != ctime ){ // 根据最后修改时间 可能会出现时间变化后但是内容没变，或者如果1s内多次变化 也监控不到 ，缓存时间的单位是秒
        //     return false;
        // }
        // tag 根据内容来生成一个唯一的标识  ETAG  
        const ifNoneMatch = req.headers['if-none-match'];

        let etag =  crypto.createHash('md5').update(readFileSync(filePath)).digest('base64');
        res.setHeader('ETag',etag);

        // 服务器需要提供一个  etag  浏览器 提供一个 if-none-match
        if(ifNoneMatch != etag){
            return false;
        }
        return true; // 强缓存 + 对比缓存的方式 
    }

    sendFile(req, res, statObj, filePath) {
        // 在发送文件前，可以要求此文件以后多少时间内不要在来访问我了, 只针对引用的资源，首次访问的资源 不会被设置

        if(this.cache(req,res,statObj,filePath)){
            res.statusCode = 304
            return res.end(); // 我不用返回内容，告诉浏览器找缓存即可
        }

       



        // 在发送前， 要进行压缩处理 浏览器和服务器说： Accept-Encoding: gzip, deflate, br
        //                         服务器会和浏览器说：content-encoding: gzip 我的内容是通过gzip压缩的
        // 文件
        res.setHeader('Content-Type', (mime.getType(filePath) || 'text/plain') + ';charset=utf-8')
        let zip = this.gzip(req,res);
        if (zip) { // 如果支持压缩就压缩 不支持就返回
            createReadStream(filePath).pipe(zip).pipe(res); // res.write() + res.end() 
        } else {
            createReadStream(filePath).pipe(res); // res.write() + res.end()   
        }

    }
    sendError(res, e) {
        console.log(e)
        res.statusCode = 404; // 顺序是先响应状态码 在结束响应
        res.end('NOT Found');
    }
    start() {
        const server = http.createServer(this.handleRequest);
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up http-server, serving:')}` + this.directory)
            console.log(`  http://${address}:${chalk.green(this.port)}`)
            console.log(`  http://127.0.0.1:${chalk.green(this.port)}`)
        });
    }
    // 3:20 压缩 、 304缓存 
}