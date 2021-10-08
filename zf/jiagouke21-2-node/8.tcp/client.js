const net = require('net');
const socket = new net.Socket();
socket.connect(8080, 'localhost');
socket.on('connect', function(data) {
    //socket.write('connect server'); // 可写流

    socket.end('');
});
socket.on('data', function(data) { // 可读流
    console.log(data.toString())
})
socket.on('error', function(error) {
    console.log(error);
});