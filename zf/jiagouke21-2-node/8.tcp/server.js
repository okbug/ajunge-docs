const net = require('net');
const server = net.createServer(function(socket){
    socket.on('data',function (data) { // 可读流
        console.log(data.toString())
        socket.write('server:hello'); // 可写流
    });
    socket.on('end',function () {
        console.log('客户端关闭')
    })
})
server.on('error',function(err){
    console.log(err);
})
server.listen(8080);