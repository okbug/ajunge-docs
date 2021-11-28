let EventEmitter = require('events');
let e = new EventEmitter();
e.on('click',()=>{
    console.log('clicked');
});
e.emit('click');
e.emit('click');