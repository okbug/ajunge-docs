const net = require('net');


const server = net.createServer((socket) => {
    socket.on('data',function(data){
        console.log(data.toString())
    })
    socket.end(`GOOD`);
}).on('error', (err) => {

});

// 获取任意未使用的端口。
server.listen(8080,() => {
    console.log('opened server on', server.address());
});