//once
let EventEmitter = require('events');
let e = new EventEmitter();
//只监听一次，触发一次后就取消监听了，不再监听了
e.once('click', () => {
    console.log('clicked');
});
e.emit('click');
e.emit('click');